import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import { Tree } from './Tree';
import { RootApp } from './schema';
import { IFluidContainer, TreeView } from 'fluid-framework';
import { AzureContainerServices } from '@fluidframework/azure-client';

export const App: React.FC<any> = (props: { appTree:TreeView<RootApp>; services: AzureContainerServices; container: IFluidContainer;}) => {  
  // const root = useTree();
  const rooData = props.appTree.root;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className="App-header">
          {rooData !== undefined && props.container !== undefined &&
          <Tree data={rooData} container={props.container} />}
        </header>
      </div>
    </DndProvider>
  );
}
