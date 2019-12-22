import {ElementType} from "react";

type LikeObject = { [key: string]: any };

type Options = {
    forwardRef?: boolean;
};

type Connect<S> = <P, T>(Component: ElementType<P & T>, listener: (state: S) => P, options?: Options) => ElementType<T>;

interface Store<S> {
    getStore: () => S;
    set: (data: Partial<S>, silent?: boolean) => void,
    addListener: (listener: (state: S) => LikeObject) => () => void,
}

export function createStore<S = LikeObject>(initialState: S): Store<S>;

export function createConnector<S>(store: Store<S>): Connect<S>
