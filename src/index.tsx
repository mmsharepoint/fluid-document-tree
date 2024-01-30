import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { loadFluidData } from './services/FluidService';
import { appTreeConfiguration, RootApp } from './schema';
import { appContainerSchema } from "./Helpers/containerSchema";
import { App } from './App';
import { ITree } from 'fluid-framework';
import { TermModel } from './model/IDataModel';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

async function main() {
  const mockNodes: TermModel = require('./data/Folders.json');
  let containerId = window.location.hash.substring(1);

	// Initialize Fluid Container
	const { services, container } = await loadFluidData(containerId, appContainerSchema);

  
  // New container? --> New Id, new data 
  if (containerId.length == 0) {
		containerId = await container.attach();

		// The newly attached container is given a unique ID that can be used to access the container in another session
		// window.history.replaceState(undefined, "", "#" + containerId);
    // container.initialObjects.appData = mockNodes;
	}
  const appTree = (container.initialObjects.appData as ITree).schematize(appTreeConfiguration);
  // Check if co was emppy?
  for (let i=0; i<mockNodes.nodes.length; i++){
    const no = mockNodes.nodes[i];
    appTree.root.items.addTermNode(no);
  }
  
  root.render(
    <React.StrictMode>
      <App appTree={appTree} services={services} container={container} />
    </React.StrictMode>
  );
}

export default main();