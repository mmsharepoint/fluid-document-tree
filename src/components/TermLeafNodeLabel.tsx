import * as React from 'react';
import { useDrop } from "react-dnd";
import { ITermLeafNodeProps } from './ITermLeafNodeProps';
import './TermLeafNodeLabel.css';
import { FileNodeLabel } from './FileNodeLabel';

export const TermLeafNodeLabel: React.FC<ITermLeafNodeProps> = (props) => {
  const moveFile = (item: any) => {
    console.log(item.file);
    console.log(item.file.title);
    console.log(item.file.id);
    console.log(item.file.url);
    const srcFileArray = item.files;
    const index = srcFileArray.indexOf(item.file);
    props.node.files.moveToIndex(props.node.files.length, index, index+1, srcFileArray);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FileNodeLabel',
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
    drop: (item) => { moveFile(item); }
  }));

  const filesArray = [];
  
  for (const f of props.node.files) {
    filesArray.push(
      <FileNodeLabel key={f.id} file={f} files={props.node.files} />
    );
  }

  return (
    <li ref={drop} className={`${isOver ? 'DragBorder' : ''} TermLeafNodeLabel`}>
      <div>
        <label>{props.node.name}</label>
      </div>
      <ul>
        {filesArray}
      </ul>
    </li>
  );
}