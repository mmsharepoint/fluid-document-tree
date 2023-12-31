import * as React from 'react';
import { parentField } from '@fluid-experimental/tree2';
import { ITermNodeProps } from './ITermLabelProps';
import { TermLeafNodeLabel } from './TermLeafNodeLabel';
import './TermNodeLabel.css';

export const TermNodeLabel: React.FC<ITermNodeProps> = (props) => {
  const subNodesArray = [];
  if (props.node.children.length > 0) {
    for (const s of props.node.children) {
      subNodesArray.push(
        <TermLeafNodeLabel key={s.id} node={s} parentIndex={props.node[parentField].index} />
      );
    }
  }
  
  return (
    <li className='TermNodeLabel'>
      <div><label>{props.node.name}</label></div>
      <ul>
        {subNodesArray}
      </ul>
    </li>
  );
}