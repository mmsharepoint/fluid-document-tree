import React from 'react';
import { ITreeProps } from "./ITreeProps";
import { TermNodeLabel } from './components/TermNodeLabel';

export const Tree: React.FC<ITreeProps> = (props) => {    
    const nodesArray = [];

    const items = props.data.items;

    for (const p of props.data.items) {
        nodesArray.push(
            <TermNodeLabel key={p.id} node={p} />
        );
    }

    return (
        <ul>{nodesArray}</ul>
    );
}