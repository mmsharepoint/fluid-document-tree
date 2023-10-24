import * as React from 'react';
import { useDrop } from "react-dnd";
import { ITermLeafNodeProps } from './ITermLeafNodeProps';
import './TermLeafNodeLabel.css';
import { FileNodeLabel } from './FileNodeLabel';
import { FileNode } from '../schema';
import { parentField } from '@fluid-experimental/tree2';

export const TermLeafNodeLabel: React.FC<ITermLeafNodeProps> = (props) => {
  const [files, setFiles] = React.useState<any[]>([]);

  const moveFile_ =  React.useCallback((fileIndex: number, sourceNodeParentIndex: number, sourceNodeIndex: number, file: FileNode) => {
    props.moveFile(fileIndex, sourceNodeParentIndex, sourceNodeIndex, props.node, file)
  },[props.node, props.moveFile]); // eslint-disable-line react-hooks/exhaustive-deps

  const insertFile = React.useCallback((file: any) => {
    props.insertFile(props.parentIndex, props.node[parentField].index, file);
  },[props.node, props.insertFile]); // eslint-disable-line react-hooks/exhaustive-deps

  
  const moveFile = (item: any) => {
    console.log(item.file);
    console.log(item.file.title);
    console.log(item.file.id);
    console.log(item.file.url);
    console.log(item.file[parentField]);
    console.log(item.file[parentField].parent);
    const index = props.node.files.length;
    const srcIndex = item.file[parentField].index;
    // props.node.files.insertNodes(index, [file]);
    const srcFileArray = item.parent.files;
    srcFileArray.moveNodes(srcIndex, 1, index, props.node.files);
  };

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'FileNodeLabel',
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver()
    }),
    drop: (item) => { moveFile(item); }
  }));

  React.useEffect(() => {
    if (props.node.files.length > 0) {
      const filesArray = [];
      
      for (const f of props.node.files) {
        filesArray.push(
          <FileNodeLabel key={f.id} node={props.node} parentIndex={props.node[parentField].index} grandParentIndex={props.parentIndex} file={f} fileIndex={f[parentField].index} />
        );
      }
      setFiles(filesArray);
    }
  }, [props.node.files]);
  return (
    <li ref={drop} className={`${canDrop ? 'DragBorder' : ''} TermLeafNodeLabel`}>
      <div>
        <label>{props.node.name}</label>
      </div>
      <ul>
        {files}
      </ul>
    </li>
  );
}