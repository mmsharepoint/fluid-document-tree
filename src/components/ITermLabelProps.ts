import { FileNode, TermLeafNode, TermNode } from "../schema";

export interface ITermNodeProps {
    node: TermNode;

    insertFile: (termIndex: number, leafIndex: number, file: any) => void;
    moveFile: (fileIndex: number, sourceNodeParentIndex: number, sourceNodeIndex: number, destinationNode: TermLeafNode, file: FileNode) => void;
}