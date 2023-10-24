import { FileNode, TermLeafNode } from "../schema";

export interface IFileNodeProps {
    file: FileNode;
    node: TermLeafNode;
    parentIndex: number;
    grandParentIndex: number;
    fileIndex: number;
}