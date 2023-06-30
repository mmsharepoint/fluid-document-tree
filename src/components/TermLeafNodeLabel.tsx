import * as React from 'react';
import { ITermLeafNodeProps } from './ITermLeafNodeProps';
import './TermLeafNodeLabel.css';
import { FileNode } from './FileNode';

export const TermLeafNodeLabel: React.FC<ITermLeafNodeProps> = (props) => {
  const [files, setFiles] = React.useState<any[]>([]);
  const [dragEntered, setDragEntered] = React.useState<boolean>(false);

  const dragOver = React.useCallback((ev: React.DragEvent<HTMLElement>) => {
    ev.preventDefault();
  },[]);

  const dragEnter = React.useCallback(() => {
    setDragEntered(true);
  },[setDragEntered]);

  const dragLeave = React.useCallback(() => {
    setDragEntered(false);
  },[setDragEntered]);
  
  const drop = React.useCallback((ev: React.DragEvent<HTMLElement>) => {    
    ev.preventDefault();
    // Drop is a file or a FileLabel
    
      const data: string = ev.dataTransfer.getData("text");
      const file = JSON.parse(data);
      alert('Dropped: ' + file);
  },[]);

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
      <div className={`${dragEntered ? 'dragEnter' : ''}`} // onClick={nodeSelected} 
            onDrop={drop} 
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}>
        <label>{props.node.name}</label>
      </div>
      <ul>
        {files}
      </ul>
    </li>
  );
}