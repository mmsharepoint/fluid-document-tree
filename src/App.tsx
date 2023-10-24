import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import { Tree } from './Tree';
import { RootApp, TermLeafNode, FileNode } from './schema';
import { IFluidContainer } from 'fluid-framework';
import { AzureContainerServices } from '@fluidframework/azure-client';
import { SharedTree, useTree } from './services/FluidService';
import { parentField } from '@fluid-experimental/tree2';

export const App: React.FC<any> = (props: { data: SharedTree<RootApp>; services: AzureContainerServices; container: IFluidContainer;}) => {  
  const root = useTree(props.data);

  const moveFile =  React.useCallback((fileIndex: number, sourceNodeParentIndex: number, sourceNodeIndex: number, destinationNode: TermLeafNode, file: FileNode) => {
    // if (sourceNode.files[file[parentField].index] !== file) return;
    console.log(file[parentField].index);
    console.log(sourceNodeParentIndex);
    // tmpData?.root.terms[sourceNodeParentIndex].children[sourceNodeIndex].files.moveNodes(fileIndex, 1, destinationNode.files.length, destinationNode.files);

  },[]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const insertFile = React.useCallback((termIndex: number, leafIndex: number, file: any) => {
    const newFile = {
      id: 99,
      title: file.name.split('.')[0],
      url: file.name
    };
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className="App-header">
          {props.data !== undefined && props.container !== undefined &&
          <Tree data={root} container={props.container} insertFile={insertFile} moveFile={moveFile} />}
        </header>
      </div>
    </DndProvider>
  );
}
