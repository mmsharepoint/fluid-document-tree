import { IFluidContainer } from "fluid-framework";
import { SharedTree } from "./services/FluidService";
import { RootApp } from "./schema";

export interface ITreeProps {
    data: SharedTree<RootApp>;
    container: IFluidContainer;
}