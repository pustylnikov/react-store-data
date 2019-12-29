export default function (initialState, middleware) {

    const listeners = {};

    let store = initialState;

    const getStore = () => {
        return store;
    };

    const dispatch = (payload = {}) => {
        store = {...store, ...payload};
        middleware && middleware.call(undefined, payload, store);
        Object.getOwnPropertySymbols(listeners).forEach(key => {
            listeners[key].call(undefined, store);
        });
    };

    const addListener = (listener) => {
        if (typeof listener !== 'function') {
            throw new TypeError('Listener must be a function.');
        }
        const key = Symbol();
        listeners[key] = listener;
        return () => {
            delete listeners[key];
        };
    };

    return {
        getStore,
        addListener,
        dispatch,
    };
}
