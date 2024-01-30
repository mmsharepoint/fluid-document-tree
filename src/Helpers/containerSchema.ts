import { ContainerSchema, SharedTree } from "fluid-framework";

// Define the schema of our Container. This includes the DDSes/DataObjects
// that we want to create dynamically and any
// initial DataObjects we want created when the container is first created.
export const appContainerSchema: ContainerSchema = {
	initialObjects: {
		appData: SharedTree
	}
};