import {
    TreeConfiguration,
    SchemaFactory,
} from 'fluid-framework';
import { ITerm } from './model/ITerm';

const sf = new SchemaFactory('fc1db2e8-0a00-11ee-be56-0242ac120002');

export class FileNode extends sf.object('FileNode', {
    id: sf.string,
    title: sf.string,
    url: sf.string,
}) {}

export class FileNodes extends sf.array("FileNodes", FileNode) {}

export class TermLeafNode extends sf.object('TermLeafNode', {
    id: sf.string,
    name: sf.string,
    files: FileNodes
}) {}

export class TermLeafNodes extends sf.array("TermLeafNodes", TermLeafNode) {}

export class TermNode extends sf.object('TermNode', {
    id: sf.string,
    name: sf.string,
    children: TermLeafNodes,
    files: FileNodes
}) {}

export class TermNodes extends sf.array("terms", TermNode) {
    public addTermNode(node: ITerm): TermNode {
		const termNode = new TermNode({
			id: node.id,
			name: node.name,
            children: node.children,
			files: []
		});

		this.insertAtEnd(termNode);
		return termNode;
	}
}

// Export the types defined here as TypeScript types.
// export type RootApp = ProxyNode<typeof appSchema>;
// export type TermNode = ProxyNode<typeof termNodeSchema>;
// export type TermLeafNodes = ProxyNode<typeof termLeafNodesSchema>;
// export type TermLeafNode = ProxyNode<typeof termLeafNodeSchema>;
// export type FileNodes = ProxyNode<typeof fileNodesSchema>;
// export type FileNode = ProxyNode<typeof fileSchema>;

// Create the schema object to pass into the SharedTree
// export const schema = builder.intoSchema(appSchema);

// export const schemaConfig: InitializeAndSchematizeConfiguration = {
//     schema,
//     initialTree: {
//         terms: [
//             {
//                 id: '',
//                 name: '',
//                 children: [],
//                 files: []
//             }            
//         ]
//     },
//     allowedSchemaModifications: AllowedUpdateType.SchemaCompatible
// }

// Define a root type.
export class RootApp extends sf.object("App", {
	items: TermNodes,
}) {}

// Export the tree config appropriate for this schema
// This is passed into the SharedTree when it is initialized
export const appTreeConfiguration = new TreeConfiguration(
	RootApp, // root node
	() => ({
		// initial tree
		items: [],
	}),
);