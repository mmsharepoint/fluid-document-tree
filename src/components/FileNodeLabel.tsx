import * as React from 'react';
import { useDrag } from 'react-dnd';
import { IFileNodeProps } from './IFileNodeProps';
import './FileNode.css';
import { parentField } from '@fluid-experimental/tree2';

export const FileNodeLabel: React.FC<IFileNodeProps> = (props) => {
  // const drag = React.useCallback((ev: React.DragEvent<HTMLElement>)=> {
  //   const transfer = { node: props.node, file: props.file, sourceNodeIndex: props.parentIndex, sourceParentIndex: props.grandParentIndex, fileIndex: props.fileIndex}
  //   ev.dataTransfer.setData("text/plain", JSON.stringify(transfer));
  // }, [props.file]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FileNodeLabel',
    item: { file: props.file, parent: props.node },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <li ref={drag} className='FileNode'>
      {/* <Icon {...getFileTypeIconProps({ extension: props.file.extension, size: 16 })} /> */}
      <a href={props.file.url}>{props.file.title}</a>
    </li>
  );
}