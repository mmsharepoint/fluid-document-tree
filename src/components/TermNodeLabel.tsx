import * as React from 'react';
import { ITermNodeProps } from './ITermLabelProps';
import { TermLeafNodeLabel } from './TermLeafNodeLabel';
import './TermNodeLabel.css';

export const TermNodeLabel: React.FC<ITermNodeProps> = (props) => {
  const [subNodes, setSubNodes] = React.useState<any[]>([]);
  React.useEffect(() => {
    if (props.node.children.length > 0) {
      const subNodesArray = [];
      
      for (const s of props.node.children) {
        subNodesArray.push(
          <TermLeafNodeLabel key={s.id} node={s} />
        );
      }
      setSubNodes(subNodesArray);
    }
  }, []);
  
  return (
    <li className='TermNodeLabel'>
      <label>{props.node.name}</label>
      <ul>
        {subNodes}
      </ul>
    </li>
  );
}