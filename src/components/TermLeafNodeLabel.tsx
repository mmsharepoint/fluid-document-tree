import * as React from 'react';
import { ITermLeafNodeProps } from './ITermLeafNodeProps';
import './TermLeafNodeLabel.css';

export const TermLeafNodeLabel: React.FC<ITermLeafNodeProps> = (props) => {
  return (
    <li className='TermLeafNodeLabel'>
      <label>{props.node.name}</label>
    </li>
  );
}