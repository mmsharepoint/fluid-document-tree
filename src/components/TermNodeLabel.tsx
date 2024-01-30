import * as React from 'react';
import { ITermNodeProps } from './ITermLabelProps';
import './TermNodeLabel.css';
import { FileNodeLabel } from './FileNodeLabel';
import { useDrop } from 'react-dnd';

export const TermNodeLabel: React.FC<ITermNodeProps> = (props) => {
  const subNodesArray = [];
  if ('children' in props.node && props.node.children.length > 0) {
    for (const s of props.node.children) {
      subNodesArray.push(
        // <TermLeafNodeLabel key={s.id} node={s} />
        <TermNodeLabel key={s.id} node={s} />
      );
    }
  }
  
  const moveFile = (item: any) => {
    console.log(item.file);
    console.log(item.file.title);
    console.log(item.file.id);
    console.log(item.file.url);
    const srcFileArray = item.files;
    const index = srcFileArray.indexOf(item.file);
    props.node.files.moveToIndex(props.node.files.length, index, srcFileArray);
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
    <li ref={drop} className={`${isOver ? 'DragBorder' : ''} TermNodeLabel`}>
      <div><label>{props.node.name}</label></div>
      <ul>
        {subNodesArray}
      </ul>
      <ul>
        {filesArray}
      </ul>
    </li>
  );
}