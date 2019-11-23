### Install
```text
npm install react-store-data --save
```
or
```text
yarn add react-store-data
```

### Usage example
```js
import {createStore} from 'react-store-data';

const initialState = {
    key: 'value',
};

const store = createStore(initialState);

// get store
store.getStore(); // {key: 'value'}

const unsubscribe = store.addListener(state => {
    console.log(state); // {key: 'new value'}
});

store.set({key: 'new value'});

// Unregister listener
unsubscribe();
```

connect to the React component
```js
import React, {Component} from 'react';
import {createStore, createConnector} from 'react-store-data';

const initialState = {
    text: '',
};

const store = createStore(initialState);
const connect = createConnector(store);

class App extends Component {
    render() {
        const {text} = this.props;
        return (
            <div>{text}</div>
        );
    }
}

export default connect(App, state => ({
    text: state.text
}));

store.set({text: 'Hello World'});
```
