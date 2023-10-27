import * as React from 'react';
import { useDrag } from 'react-dnd';
import { IFileNodeProps } from './IFileNodeProps';
import './FileNode.css';

export const FileNodeLabel: React.FC<IFileNodeProps> = (props) => {  
  const [ , drag] = useDrag(() => ({
    type: 'FileNodeLabel',
    item: { file: props.file, files: props.files },
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