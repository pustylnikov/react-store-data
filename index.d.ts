import {ReactNode} from "react";

type LikeObject = { [key: string]: any };
type Options = {
    forwardRef?: boolean;
};

type Connect<S> = (Node: ReactNode, observer: (state: S) => LikeObject, options?: Options) => ReactNode;

interface Store<S> {
    getStore: () => S;
    set: (data: Partial<S>, silent?: boolean) => void,
    addListener: (state: S) => LikeObject,
}

export function createStore<S = LikeObject>(initialState: S): Store<S>;

export function createConnector<S>(store: Store<S>): Connect<S>
