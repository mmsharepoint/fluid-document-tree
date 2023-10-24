import { IFluidContainer } from "fluid-framework";
import { SharedTree } from "./services/FluidService";
import { FileNode, RootApp, TermLeafNode } from "./schema";

export interface ITreeProps {
    data: RootApp;
    container: IFluidContainer;
    insertFile: (termIndex: number, leafIndex: number, file: any) => void;
    moveFile: (fileIndex: number, sourceNodeParentIndex: number, sourceNodeIndex: number, destinationNode: TermLeafNode, file: FileNode) => void;
}