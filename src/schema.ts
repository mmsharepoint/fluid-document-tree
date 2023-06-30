import {
    FieldKinds,
    SchemaAware,
    SchemaBuilder,
    ValueSchema,
} from '@fluid-experimental/tree2';

const builder = new SchemaBuilder('fc1db2e8-0a00-11ee-be56-0242ac120002');

export const string = builder.primitive('string', ValueSchema.String);

export const fileSchema = builder.object('demo:file', {
    local: {
        id: SchemaBuilder.field(FieldKinds.value, string),
        title: SchemaBuilder.field(FieldKinds.value, string),
        url: SchemaBuilder.field(FieldKinds.value, string)
    }
});

const termLeafNodeSchema = builder.object('demo:leaf', {
    local: {
        id: SchemaBuilder.field(FieldKinds.value, string),
        name: SchemaBuilder.field(FieldKinds.value, string),        
        files: SchemaBuilder.field(FieldKinds.sequence, fileSchema)
    },
});

const termNodeSchema = builder.object('demo:node', {
    local: {
        id: SchemaBuilder.field(FieldKinds.value, string),
        name: SchemaBuilder.field(FieldKinds.value, string),
        children: SchemaBuilder.field(FieldKinds.sequence, termLeafNodeSchema)
    },
});

export const appSchema = builder.object('demo:app', {
    local: {
        terms: SchemaBuilder.field(FieldKinds.sequence, termNodeSchema),
    },
});

// Define the root of the schema as the app type.
export const rootField = SchemaBuilder.field(FieldKinds.value, appSchema);

// Create the schema object to pass into the SharedTree
export const schema = builder.intoDocumentSchema(rootField);

// Export the types defined here as TypeScript types.
export type RootApp = SchemaAware.TypedNode<typeof appSchema>;
export type TermNode = SchemaAware.TypedNode<typeof termNodeSchema>;
export type TermLeafNode = SchemaAware.TypedNode<typeof termLeafNodeSchema>;
export type FileNode = SchemaAware.TypedNode<typeof fileSchema>;