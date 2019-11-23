export default function (initialState) {

    let store = initialState;
    const listeners = {};

    const getStore = () => {
        return store;
    };

    const set = (data = {}, silent = false) => {
        store = {...store, ...data};
        if (silent === false) {
            Object.getOwnPropertySymbols(listeners).forEach(key => {
                listeners[key].call(undefined, store);
            });
        }
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
        set,
        addListener,
    };
}
