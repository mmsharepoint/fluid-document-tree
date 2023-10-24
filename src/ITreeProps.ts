import { IFluidContainer } from "fluid-framework";
import { RootApp } from "./schema";

export interface ITreeProps {
    data: RootApp;
    container: IFluidContainer;
}