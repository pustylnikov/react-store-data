import React, {useEffect, useState} from 'react';

export default function (store) {

    const defaultOptions = {
        forwardRef: false,
    };

    const withState = (mapStateToProps) => {
        const [state, setState] = useState(mapStateToProps(store.getStore()));
        useEffect(() => {
            const unsubscribe = store.addListener(function (data) {
                setState(mapStateToProps(data));
            });
            return () => {
                unsubscribe();
            };
        });
        return state;
    };

    const connect = (mapStateToProps, mapDispatchToProps) => (Component, options = {}) => {
        const _options = {...defaultOptions, ...options};
        const dispatchProps = mapDispatchToProps
            ? mapDispatchToProps(store.dispatch, store.getStore)
            : {};
        if (_options.forwardRef === true) {
            return React.forwardRef((props, ref) => {
                const state = withState(mapStateToProps);
                return <Component {...dispatchProps} {...props} {...state} ref={ref}/>;
            });
        }
        return props => {
            const state = withState(mapStateToProps);
            return <Component {...dispatchProps} {...props} {...state}/>;
        };
    };

    return connect;
}
