import {
    AzureClient,
    AzureRemoteConnectionConfig,
    AzureLocalConnectionConfig,
    AzureContainerServices,
    AzureClientProps,
    AzureMember,
    ITokenProvider,
    ITokenResponse,
} from '@fluidframework/azure-client';

import {
    AllowedUpdateType,
    GlobalFieldSchema,
    ISharedTree,
    SchematizeConfiguration,
    SharedTreeFactory,
} from '@fluid-experimental/tree2';
import { IFluidContainer } from 'fluid-framework';
import TinyliciousClient from '@fluidframework/tinylicious-client';
import React from "react";
import { RootApp, schema } from '../schema';

const client = new TinyliciousClient();

export class MySharedTree {
    public static getFactory(): SharedTreeFactory {
        return new SharedTreeFactory();
    }
}

const containerSchema = {
    initialObjects: { tree: MySharedTree }
};

const createContainer = async () => {
    const { container } = await client.createContainer(containerSchema);
    const containerId = await container.attach();
    const mockNodes = require('../data/Folders.json');
   
    // Initialize tree
    const sharedVotes = container.initialObjects.tree as ISharedTree;
    sharedVotes.schematize({ schema,
      initialTree: {
        terms: mockNodes,
      },
      allowedSchemaModifications: AllowedUpdateType.SchemaCompatible});
    
    return container;
};

export const loadFluidData = async <TRoot extends GlobalFieldSchema>(): Promise<{
    data: SharedTree<RootApp>;
    // services: AzureContainerServices;
    container: IFluidContainer;
}> => {
    let container: IFluidContainer;
    let services: AzureContainerServices;
    let id: string;
   
    const createNew = true;
    if (createNew) {
        container = await createContainer();
        // id = await container.attach();
    } else {      
        id = window.location.hash.substring(1);
        ({ container, services } = await client.getContainer(id, containerSchema));
    }
    const sharedVotes = container.initialObjects.tree as ISharedTree;
    const data = new SharedTree<RootApp>(sharedVotes, sharedVotes.root as any);
    return { data, container };
}

const treeSym = Symbol();

export function useTree<TRoot>(tree: SharedTree<TRoot>): TRoot  {
    // This proof-of-concept implementation allocates a state variable this is modified
    // when the tree changes to trigger re-render.
    const [invalidations, setInvalidations] = React.useState(0);

    // Register for tree deltas when the component mounts
    React.useEffect(() => {
        // Returns the cleanup function to be invoked when the component unmounts.
        return tree[treeSym].events.on('afterBatch', () => {
            setInvalidations(invalidations + Math.random());
        });
    });

    return tree[treeSym].root as unknown as TRoot;
};

export class SharedTree<T> {
    constructor(private readonly tree: ISharedTree, public readonly root: T) {}

    public get [treeSym]() {
        return this.tree;
    }
}