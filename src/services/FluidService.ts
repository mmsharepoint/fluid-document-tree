import {
    AzureClient,
    AzureRemoteConnectionConfig,
    AzureLocalConnectionConfig,
    AzureContainerServices,
    AzureClientProps,
    AzureFunctionTokenProvider
} from '@fluidframework/azure-client';

import {
    AllowedUpdateType,
    FieldSchema,
    ISharedTree,
    ISharedTreeView,
    InitializeAndSchematizeConfiguration,
    SharedTreeFactory,
} from '@fluid-experimental/tree2';
import { IFluidContainer } from 'fluid-framework';
import { InsecureTokenProvider } from '@fluidframework/test-runtime-utils';
import React from "react";
import { RootApp, schema } from '../schema';

// const client = new TinyliciousClient();

export class MySharedTree {
    public static getFactory(): SharedTreeFactory {
        return new SharedTreeFactory();
    }
}

const containerSchema = {
    initialObjects: { tree: MySharedTree }
};

// Define the server (Azure or local) we will be using
const useAzure = process.env.REACT_APP_FLUID_CLIENT === 'azure';
if (!useAzure) {
    console.warn(`Configured to use local tinylicious.`);
}

const tenantId = process.env.REACT_APP_TENANT_ID!
// const remoteConnectionConfig: AzureRemoteConnectionConfig = {
//     type: 'remote',
//     tenantId: tenantId,
//     tokenProvider: new InsecureTokenProvider(process.env.REACT_APP_TENANT_KEY!, { id: "John Doe", name: "John Doe"}),
//     endpoint: process.env.REACT_APP_ORDERER!,
// };
const remoteConnectionConfig: AzureRemoteConnectionConfig = {
    type: 'remote',
    tenantId: tenantId,
    tokenProvider: new AzureFunctionTokenProvider(
        process.env.REACT_APP_TOKEN_PROVIDER_URL!,
        { userId: "John Doe", userName: "John Doe"}
    ),
    endpoint: process.env.REACT_APP_ORDERER!
};

const localConnectionConfig: AzureLocalConnectionConfig = {
    type: 'local',
    tokenProvider: new InsecureTokenProvider('VALUE_NOT_USED', { id: "", name: "John Doe"}),
    endpoint: 'http://localhost:7070',
};

const connectionConfig: AzureRemoteConnectionConfig | AzureLocalConnectionConfig =
    useAzure ? remoteConnectionConfig : localConnectionConfig;

const clientProps: AzureClientProps = {
    connection: connectionConfig,
};

const client = new AzureClient(clientProps);
// const client = new TinyliciousClient();

async function initializeNewContainer<TRoot extends FieldSchema>(
    container: IFluidContainer,
    config: InitializeAndSchematizeConfiguration<TRoot>
): Promise<void> {
    const fluidTree = container.initialObjects.tree as ISharedTree;
    fluidTree.schematize(config);
}

export const loadFluidData = async <TRoot extends FieldSchema>(
    config: InitializeAndSchematizeConfiguration<TRoot>
): Promise<{
    data: SharedTree<RootApp>;
    services: AzureContainerServices;
    container: IFluidContainer;
}> => {
    let container: IFluidContainer;
    let services: AzureContainerServices;
    let id: string;

    // Get or create the document depending if we are running through the create new flow
    const createNew = window.location.hash.length === 0;
    if (createNew) {
        // The client will create a new detached container using the schema
        // A detached container will enable the app to modify the container before attaching it to the client
        ({ container, services } = await client.createContainer(containerSchema));

        // Initialize our Fluid data -- set default values, establish relationships, etc.
        await initializeNewContainer(container, config);

        // If the app is in a `createNew` state, and the container is detached, we attach the container.
        // This uploads the container to the service and connects to the collaboration session.
        id = await container.attach();
        // The newly attached container is given a unique ID that can be used to access the container in another session
        window.location.hash = id;
    } else {
        id = window.location.hash.substring(1);
        // Use the unique container ID to fetch the container created earlier.  It will already be connected to the
        // collaboration session.
        ({ container, services } = await client.getContainer(id, containerSchema));
    }

    const tree = container.initialObjects.tree as ISharedTree;
    const view = tree.schematize({ schema,
          initialTree: {
            terms: [],
          },
          allowedSchemaModifications: AllowedUpdateType.SchemaCompatible});
    const data = new SharedTree<RootApp>(view, view.root as any);    

    return { data, services, container };
};

const treeSym = Symbol();

export function useTree<TRoot>(tree: SharedTree<TRoot>): TRoot {
    // This proof-of-concept implementation allocates a state variable this is modified
    // when the tree changes to trigger re-render.
    const [invalidations, setInvalidations] = React.useState(0);

    // Register for tree deltas when the component mounts
    React.useEffect(() => {
        // Returns the cleanup function to be invoked when the component unmounts.
        return tree[treeSym].events.on("afterBatch", () => {
            setInvalidations(invalidations + Math.random());
        });
    });

    return tree.root as unknown as TRoot;
}

export class SharedTree<T> {
    constructor(private readonly tree: ISharedTreeView, public readonly root: T) {}

    public get [treeSym]() {
        return this.tree;
    }
}