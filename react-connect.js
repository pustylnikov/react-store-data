import React, {useEffect, useState} from 'react';

export default function (store) {

    const defaultOptions = {
        forwardRef: false,
    };

    const withState = (observer) => {
        const [state, setState] = useState(observer(store.getStore()));
        useEffect(() => {
            const unsubscribe = store.addListener(function (data) {
                setState(observer(data));
            });
            return () => {
                unsubscribe();
            };
        });
        return state;
    };

    const connect = (Node, observer, options = {}) => {
        const _options = {...defaultOptions, ...options};
        if (_options.forwardRef === true) {
            return React.forwardRef((props, ref) => {
                const state = withState(observer);
                return <Node {...props} {...state} ref={ref}/>;
            });
        }
        return props => {
            const state = withState(observer);
            return <Node {...props} {...state}/>;
        };
    };

    return connect;
}
