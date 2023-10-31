import {
    AllowedUpdateType,
    InitializeAndSchematizeConfiguration,
    ProxyNode,
    SchemaBuilder,
} from '@fluid-experimental/tree2';

const builder = new SchemaBuilder({scope: 'fc1db2e8-0a00-11ee-be56-0242ac120002'});

// export const string = builder.leaf('string', ValueSchema.String);

export const fileSchema = builder.object('file', {
    id: builder.string,
    title: builder.string,
    url: builder.string
});

export const fileNodesSchema = builder.list(fileSchema);

const termLeafNodeSchema = builder.object('leaf', {
    id: builder.string,
    name: builder.string,
    files: fileNodesSchema
});

export const termLeafNodesSchema = builder.list(termLeafNodeSchema);

const termNodeSchema = builder.object('node', {
    id: builder.string,
    name: builder.string,
    children: termLeafNodesSchema,
    files: fileNodesSchema
});

export const appSchema = builder.object('app', {
    terms: builder.list(termNodeSchema)
});

// Export the types defined here as TypeScript types.
export type RootApp = ProxyNode<typeof appSchema>;
export type TermNode =ProxyNode<typeof termNodeSchema>;
export type TermLeafNode = ProxyNode<typeof termLeafNodeSchema>;
export type FileNodes = ProxyNode<typeof fileNodesSchema>;
export type FileNode = ProxyNode<typeof fileSchema>;

// Create the schema object to pass into the SharedTree
export const schema = builder.intoSchema(appSchema);

export const schemaConfig: InitializeAndSchematizeConfiguration = {
    schema,
    initialTree: {
        terms: [
            {
                id: '',
                name: '',
                children: [],
                files: []
            }            
        ]
    },
    allowedSchemaModifications: AllowedUpdateType.SchemaCompatible
}