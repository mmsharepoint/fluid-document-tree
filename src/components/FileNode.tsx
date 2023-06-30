import * as React from 'react';
import { IFileNodeProps } from './IFileNodeProps';

export const FileNode: React.FC<IFileNodeProps> = (props) => {
    return (
      <li>
        {/* <Icon {...getFileTypeIconProps({ extension: props.file.extension, size: 16 })} /> */}
        <a draggable={false} href={props.file.url}>{props.file.title}</a>
      </li>
    );
  }