import * as React from 'react';
import { ITermLeafNodeProps } from './ITermLeafNodeProps';
import './TermLeafNodeLabel.css';
import { FileNode } from './FileNode';

export const TermLeafNodeLabel: React.FC<ITermLeafNodeProps> = (props) => {
  const [files, setFiles] = React.useState<any[]>([]);
  React.useEffect(() => {
    if (props.node.files.length > 0) {
      const filesArray = [];
      
      for (const f of props.node.files) {
        filesArray.push(
          <FileNode key={f.id} file={f} />
        );
      }
      setFiles(filesArray);
    }
  }, []);
  return (
    <li className='TermLeafNodeLabel'>
      <label>{props.node.name}</label>
      <ul>
        {files}
      </ul>
    </li>
  );
}