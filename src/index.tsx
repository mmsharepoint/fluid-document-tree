import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { loadFluidData } from './services/FluidService';
import { schemaConfig } from './schema';
import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

async function main() {
  const mockNodes: any[] = require('./data/Folders.json');
  schemaConfig.initialTree!.terms = mockNodes;
  const { data, services, container } = await loadFluidData(schemaConfig);

  root.render(
    <React.StrictMode>
      <App data={data} services={services} container={container} />
    </React.StrictMode>
  );
}

export default main();