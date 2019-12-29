import {ElementType} from "react";

export type Options = {
    forwardRef?: boolean;
};
export type Middleware<S> = (payload: Partial<S>, state: S) => void;
export type Dispatch<S> = (data: Partial<S>) => void;
export type GetStore<S> = () => S;
export type Listener<S> = (listener: (state: S) => {}) => () => void;
export type Wrapper<S, T> = <P>(Component: P, options?: Options) => ElementType<T>;
export type MapStateToPropsType<S, T> = (state: S) => T;
export type MapDispatchToPropsType<S, T> = (dispatch: Dispatch<S>, getStore: GetStore<S>) => T;
export type Connect<S> = <SP, OP, DP = {}>(
    mapStateToProps?: MapStateToPropsType<S, SP>,
    mapDispatchToProps?: MapDispatchToPropsType<S, DP>
) => Wrapper<SP, OP>;

export interface Store<S> {
    getStore: GetStore<S>;
    dispatch: Dispatch<S>,
    addListener: Listener<S>,
}

export function createStore<S = {}>(initialState: S, middleware?: Middleware<S>): Store<S>;

export function createConnector<S>(store: Store<S>): Connect<S>
