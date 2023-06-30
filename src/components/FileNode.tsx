import * as React from 'react';
import { IFileNodeProps } from './IFileNodeProps';
import './FileNode.css';

export const FileNode: React.FC<IFileNodeProps> = (props) => {
  const drag = React.useCallback((ev: React.DragEvent<HTMLElement>)=> {
    ev.dataTransfer.setData("text/plain", JSON.stringify(props.file));
  }, [props.file]);

  return (
    <li className='FileNode' draggable={true} onDragStart={drag}>
      {/* <Icon {...getFileTypeIconProps({ extension: props.file.extension, size: 16 })} /> */}
      <a draggable={false} href={props.file.url}>{props.file.title}</a>
    </li>
  );
}