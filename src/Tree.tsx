import React from 'react';
import { ITreeProps } from "./ITreeProps";
import { TermNodeLabel } from './components/TermNodeLabel';

export const Tree: React.FC<ITreeProps> = (props) => {    
    const nodesArray = [];

    for (const p of props.data.terms) {
        nodesArray.push(
            <TermNodeLabel key={p.id} node={p} insertFile={props.insertFile} moveFile={props.moveFile}/>
        );
    }

    return (
        <ul>{nodesArray}</ul>
    );
}