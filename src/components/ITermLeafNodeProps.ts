import { FileNode, TermLeafNode, TermNode } from "../schema";

export interface ITermLeafNodeProps {
    node: TermLeafNode;
    parentIndex: number;
    moveFile: (fileIndex: number, sourceNodeParentIndex: number, sourceNodeIndex: number, destinationNode: TermLeafNode, file: FileNode) => void;
    insertFile: (termIndex: number, leafIndex: number, file: any) => void;
}