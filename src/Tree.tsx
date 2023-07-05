import React from 'react';
import { useTree } from './services/FluidService';
import { ITreeProps } from "./ITreeProps";
import { TermNodeLabel } from './components/TermNodeLabel';

export const Tree: React.FC<ITreeProps> = (props) => {
    const root = useTree(props.data);
    const nodesArray = [];
    for (const p of root.terms) {
    nodesArray.push(
        <TermNodeLabel key={p.id} node={p} />
    );
    }
    return (
        <ul>{nodesArray}</ul>
    );
}