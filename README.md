# react-reduce-hooks
![NPM](https://img.shields.io/npm/l/react-reduce-hooks) ![npm](https://img.shields.io/npm/v/react-reduce-hooks)

<!-- TOC -->

- [react-reduce-hooks](#react-reduce-hooks)
  - [Install](#install)
  - [Description](#description)
  - [Why?](#why)
  - [How?](#how)
  - [Documentation](#documentation)
  - [Example](#example)
  - [Problems or Suggestions](#problems-or-suggestions)

<!-- /TOC -->

## Install

```bash
npm install --save react-reduce-hooks
```

## Description

`react-reduce-hooks` allows you to implement a state-management solution using React Context, while leverages good practices and provide DRY code.

 This is a light library and is just a simple wrapper around Context and takes ideas and patterns from `redux` hooks with almost the same API so you can migrate easily.

 It enforces good practices for implementing state-management with hooks; e.g.:
 - Provides custom `Provider` HOC for wrapping your components.
 - Provides custom `useSelector` hook for selecting what you need from the store.
 - Prevents unnecessary re-renders implementing basic memoization on top of your components.
   This package uses [`use-context-selection`](https://www.npmjs.com/package/use-context-selection) internally. `use-context-selection` allows selecting from Context only what you need and then trigger a re-render on consumer components only when that data changes.


## Why?

While it is possible to implement a simple redux-like functionality just with `useReducer` + `useContext`, there are good recommendations and practices to follow, especially for growing applications.

Since Context rerenders all the consumers using a good selector library is a must if you care about performance.

I recommend [`use-context-selection`](https://www.npmjs.com/package/use-context-selection) and this library is based on it.

This library allows you implementing good practices for your custom state-management solution using React Context while being able to migrate easily to redux if you need to.

## How

> *In this section, we will review the basic functionality provided by the library. The snippets are based on the example application located in `examples/counter`.*

Let's go through this example by explaining what is happening on the different files:

### Provider

```js
/// store.js

import React from 'react'
import { createStore, Provider } from 'react-reduce-hooks'

const initialState = {
  count: 0,
  name: 'world'
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    default:
      return state
  }
}

const AppProvider = ({ children }) => {
  const [store, dispatch] = createStore(reducer, initialState)
  return (
    <Provider store={store} dispatch={dispatch}>
      {children}
    </Provider>
  )
}

export {
  AppProvider
}

```

 **Note**: you can check below the documentation for more advanced scenarios.

`createStore` is same as calling useReducer. After just pass the store and the dispatch function to your provider.

 Next, use the `Provider` component for wrapping your application's code.

```js
/// App.js

import React from 'react'
import { AppProvider } from './store'
import Counter from './Counter'
import User from './User'
import './App.css'


const App = () => (
  <AppProvider>
    <Counter />
    <User />
  </AppProvider>
)

export default App
```

Now you just subscribe to state changes with useSelector and dispatch actions in your components.

```js
/// Counter.js

import React from 'react'
import { useSelector, useDispatch } from 'react-reduce-hooks'

const Counter = () => {
  const count = useSelector((state) => state.count)
  const dispatch = useDispatch()
  return (
    <p>
      Clicked: <span>{count}</span> times
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </p>
  )
}

export default Counter
```

Same here.

```js
/// User.js

import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-reduce-hooks'

const User = () => {
  const name = useSelector((state) => state.name)
  const dispatch = useDispatch()
  const inputRef = useRef()
  return (
    <p>
      Hello <span>{name}</span> <input ref={inputRef} autoFocus={true} />
      <button onClick={() => dispatch({ type: 'SET_NAME', name: inputRef.current.value })}>set name</button>
    </p>
  )
}

export default User
```

## Documentation

### Provider

The provider component to wrap your application.

| Props | Type | Description | Optional / Required |
|-------|-------------|-------------|---------------|
| store | any | The store value returned by useReducer or createStore | Required |
| dispatch | Function | The dispatch function returned by useReducer or createStore | Required |
| context | React Context or [React Context] | your custom context if you want to hold the reference. it can be an array of two Contexts, the first for your state the second for the dispatch function | Optional |
| equalityFn | Function | Function used to compare old vs new state; by default it performs shallow equality check | Optional |

### createStore

The same as useReducer. It is just a wrapper around it

| Param | Type | Description | Optional / Required |
|-------|-------------|-------------|---------------|
| reducer | any | The root reducer of your application to pass to useReducer | Required |
| initialState | Function | The initial state. It is a best practice to specify it. If optional your reducer should be able to return it when called | Optional |

- **Return Value**: an array with first argument the store and second argument the dispatch function

### useDispatch

This hook is used to get the dispacth function on your components.

| Param | Type | Description | Optional / Required |
|-------|-------------|-------------|---------------|
| context | React Context |  The dispatch Context that you've passed to the provider in the context props as second element of the array. This is the case when you hold the reference of your own contexts.  | Optional |

- **Return Value**: the dispatch function

### useSelector

This hook is used to access the state.

| Param | Type | Description | Optional / Required |
|-------|-------------|-------------|---------------|
| selector | Function | The selector function. takes the state as param. the return will be the return value of `useSelector` | Required |
| context | React Context | The state Context that you've passed to the provider in the context props as first element of the array. This is the case when you hold the reference of your own contexts.  | Optional |

- **Return Value**: the value returned by the selector function

### createContext

Creates a smart `Context` object which compares changes on your Context state and dispatches changes to subscribers.
This function is from the library [`use-context-selection`](https://www.npmjs.com/package/use-context-selection).

| Param | Type | Description | Optional / Required |
|-------|-------------|-------------|---------------|
| initValue | any | Initial value for the Context | Required |
| equalityFn | Function | Function used to compare old vs new state; by default it performs shallow equality check | Optional |

- **Return Value**: Context

### useStore

This hook is not very useful. It's the same as calling React's useContext. It gives you the context value.

| Param | Type | Description | Optional / Required |
|-------|-------------|-------------|---------------|
| context | React Context |  The state Context that you've passed to the provider in the context props as first element of the array. This is the case when you hold the reference of your own contexts.   | Optional |

- **Return Value**: Context value

## Example

Check the example to better understand the library and get inspiration to write your next awesome app!

- **Counter App**

This is a simple Counter application; it uses a reducer to manage state and connects components to the store using the hooks helpers. 

[https://github.com/pacobabs/react-reduce-hooks/tree/master/examples/counter](https://github.com/pacobabs/react-reduce-hooks/tree/master/examples/counter)





## Problems or Suggestions

Please feel free to open an issue on [github](https://github.com/pacobabs/react-reduce-hooks).