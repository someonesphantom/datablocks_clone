import { MouseEvent } from 'react';
import { GetState, SetState } from 'zustand';
import { HandleElement, Node, ReactFlowState } from '../../types';
export declare const getHandleBounds: (nodeElement: HTMLDivElement, scale: number) => {
    source: HandleElement[] | null;
    target: HandleElement[] | null;
};
export declare const getHandleBoundsByHandleType: (selector: string, nodeElement: HTMLDivElement, parentBounds: DOMRect, k: number) => HandleElement[] | null;
export declare function getMouseHandler(id: string, getState: GetState<ReactFlowState>, handler?: (event: MouseEvent, node: Node) => void): ((event: MouseEvent) => void) | undefined;
export declare function handleNodeClick({ id, store, }: {
    id: string;
    store: {
        getState: GetState<ReactFlowState>;
        setState: SetState<ReactFlowState>;
    };
}): void;
