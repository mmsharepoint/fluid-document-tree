import React from 'react';
import { TinyliciousClient } from '@fluidframework/tinylicious-client';
import { ContainerSchema, IFluidContainer } from 'fluid-framework';
import {
  AllowedUpdateType,
  ContextuallyTypedNodeData,
  ContextuallyTypedNodeDataObject,
  GlobalFieldSchema,
  ISharedTree,
  ITreeCursor,
  MarkedArrayLike,
  SchematizeConfiguration,
  SharedTreeFactory
} from '@fluid-experimental/tree2';
import { schema, RootApp, TermNode } from './schema';

import './App.css';
import { TermNodeLabel } from './components/TermNodeLabel';

const client = new TinyliciousClient();

export class MySharedTree {
  public static getFactory(): SharedTreeFactory {
      return new SharedTreeFactory();
  }
}

const containerSchema = {
  initialObjects: { tree: MySharedTree }
};

const createContainer = async () => {
  
  
  const { container } = await client.createContainer(containerSchema);
  const containerId = await container.attach();
  const mockNodes = [
    {
      "id": "",
      "name": "Folder 1",
      "children": [
        {
            "id": "",
            "name": "Subfolder 1.1"
        }
      ]
    },{
      "id": "",
      "name": "Folder 2",
      "children": []
    },
    {
      "id": "",
      "name": "Folder 3",
      "children": []
    } 
  ];
  // Initialize tree
  const sharedVotes = container.initialObjects.tree as ISharedTree;
  sharedVotes.schematize({ schema,
    initialTree: {
      terms: mockNodes,
    },
    allowedSchemaModifications: AllowedUpdateType.SchemaCompatible});
  
  const data = new SharedTree<RootApp>(sharedVotes, sharedVotes.root as any);
  return { container, data };
};

const loadData = (data: SharedTree<RootApp>) => {
  const MockNodes: TermNode[] = require('./data/Folders.json');
  
  console.log(MockNodes.length);
  console.log(MockNodes[0].name);

  MockNodes.forEach(a => {
    const index = data.root.terms.length;
    data.root.terms.insertNodes(index, [a]);
  });
  return data;
};

export const App: React.FC<any> = (props) => {
  const [nodes, setNodes] = React.useState<any[]>([]);
  createContainer()
    .then(({container, data}) => {
      const nodesArray = [];
      //data = loadData(data);
      for (const p of data.root.terms) {
        nodesArray.push(
          <TermNodeLabel key={p.id} node={p} />
        );
      }
      setNodes(nodesArray);
    });
  return (
    <div className="App">
      <header className="App-header">
        <ul>{nodes}</ul>
      </header>
    </div>
  );
}

const treeSym = Symbol();

export class SharedTree<T> {
  constructor(private readonly tree: ISharedTree, public readonly root: T) {}

  public get [treeSym]() {
      return this.tree;
  }
}

