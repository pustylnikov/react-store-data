import {ReactNode} from "react";

type LikeObject = { [key: string]: any };
type Options = {
    forwardRef?: boolean;
};
type Listener<S> = (state: S) => LikeObject;
type Connect<S> = (Node: ReactNode, listener: Listener<S>, options?: Options) => ReactNode;

interface Store<S> {
    getStore: () => S;
    set: (data: Partial<S>, silent?: boolean) => void,
    addListener: (listener: Listener<S>) => () => any,
}

export function createStore<S = LikeObject>(initialState: S): Store<S>;

export function createConnector<S>(store: Store<S>): Connect<S>
