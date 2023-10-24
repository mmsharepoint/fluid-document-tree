import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import { Tree } from './Tree';
import { RootApp } from './schema';
import { IFluidContainer } from 'fluid-framework';
import { AzureContainerServices } from '@fluidframework/azure-client';
import { SharedTree, useTree } from './services/FluidService';

export const App: React.FC<any> = (props: { data: SharedTree<RootApp>; services: AzureContainerServices; container: IFluidContainer;}) => {  
  const root = useTree(props.data);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className="App-header">
          {props.data !== undefined && props.container !== undefined &&
          <Tree data={root} container={props.container} />}
        </header>
      </div>
    </DndProvider>
  );
}
