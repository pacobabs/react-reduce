import React from 'react'
import { createStore, Provider } from 'react-reduce-hooks'
import { initDevtools, wrapWithDevtools } from 'reduce-devtools-extension'

const initialState = {
  count: 0,
  name: 'world'
}

const reducer = wrapWithDevtools((state, action) => {
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
})

const AppProvider = ({ children }) => {
  const [store, dispatch] = createStore(reducer, initialState)
  initDevtools(store, dispatch)
  return (
    <Provider store={store} dispatch={dispatch}>
      {children}
    </Provider>
  )
}

export {
  AppProvider
}
