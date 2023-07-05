import React from 'react';

import './App.css';
import { loadFluidData, useTree } from './services/FluidService';
import { Tree } from './Tree';

const moveFile = () => {
  
}
/* const loadData = (data: SharedTree<RootApp>) => {
  const MockNodes: TermNode[] = require('./data/Folders.json');
  
  console.log(MockNodes.length);
  console.log(MockNodes[0].name);

  MockNodes.forEach(a => {
    const index = data.root.terms.length;
    data.root.terms.insertNodes(index, [a]);
  });
  return data;
}; */

export const App: React.FC<any> = (props) => {
  const [nodes, setNodes] = React.useState<any>();
  loadFluidData()
    .then(({container, data}) => {
      const rootTree = <Tree data={data} container={container} />;
      setNodes(rootTree);
    });
  return (
    <div className="App">
      <header className="App-header">
        <ul>{nodes}</ul>
      </header>
    </div>
  );
}

/* const treeSym = Symbol();

export class SharedTree<T> {
  constructor(private readonly tree: ISharedTree, public readonly root: T) {}

  public get [treeSym]() {
      return this.tree;
  }
} */

