import {
    AllowedUpdateType,
    SchemaAware,
    SchemaBuilder,
    ValueSchema,
} from '@fluid-experimental/tree2';

const builder = new SchemaBuilder('fc1db2e8-0a00-11ee-be56-0242ac120002');

export const string = builder.leaf('string', ValueSchema.String);

export const fileSchema = builder.struct('demo:file', {
    id: SchemaBuilder.fieldValue(string),
    title: SchemaBuilder.fieldValue(string),
    url: SchemaBuilder.fieldValue(string)
});

const termLeafNodeSchema = builder.struct('demo:leaf', {
    id: SchemaBuilder.fieldValue(string),
    name: SchemaBuilder.fieldValue(string),
    files: SchemaBuilder.fieldSequence(fileSchema)
});

const termNodeSchema = builder.struct('demo:node', {
    id: SchemaBuilder.fieldValue(string),
    name: SchemaBuilder.fieldValue(string),
    children: SchemaBuilder.fieldSequence(termLeafNodeSchema)
});

export const appSchema = builder.struct('demo:app', {
    terms: SchemaBuilder.fieldSequence(termNodeSchema)
});

// Define the root of the schema as the app type.
export const rootField = SchemaBuilder.fieldValue(appSchema);

// Create the schema object to pass into the SharedTree
export const schema = builder.intoDocumentSchema(rootField);

// Export the types defined here as TypeScript types.
export type RootApp = SchemaAware.TypedNode<typeof appSchema>;
export type TermNode = SchemaAware.TypedNode<typeof termNodeSchema>;
export type TermLeafNode = SchemaAware.TypedNode<typeof termLeafNodeSchema>;
export type FileNode = SchemaAware.TypedNode<typeof fileSchema>;

export const schemaConfig = {
    schema,
    initialTree: {
        terms: [
            {
                id: '',
                name: '',
                children: []
            }            
        ]
    },
    allowedSchemaModifications: AllowedUpdateType.SchemaCompatible
}