import React, { useContext, useReducer, ReactNode } from 'react'
import { createContext, useContextSelection } from 'use-context-selection'

type Props = {
  store: any
  dispatch: React.Dispatch<any>
  context?: React.Context<any>
  equalityFn?: (a: any, b: any) => boolean
  children: ReactNode
}

let StateContext: React.Context<any>
let DispatchContext: React.Context<React.Dispatch<any>>

const Provider = (props: Props) => {
  const { context, store, dispatch, children, equalityFn } = props
  initContext(context, equalityFn)
  return (
    <StateContext.Provider value={store}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  )
}

const initContext = (context?: React.Context<any>, equalityFn?: (a: any, b: any) => boolean) => {
  if (StateContext && DispatchContext) return
  StateContext = Array.isArray(context) ? context[0] : context || createContext(undefined, equalityFn)
  DispatchContext = Array.isArray(context) && context.length > 1 ? context[1] : createContext(undefined)
}

const createStore = (reducer: any, initialState?: any) => {
  return initialState === undefined ? useReducer(reducer, initialState, reducer) : useReducer(reducer, initialState)
}

const useDispatch = (Context: React.Context<any> = DispatchContext) => {
  return useContext(Context)
}

const useSelector = (selector: (state: any) => any, Context: React.Context<any> = StateContext) => {
  return useContextSelection(Context, selector)
}

const useStore = (Context: React.Context<any> = StateContext) => {
  return useContext(Context)
}

export { Provider, createContext, createStore, useStore, useDispatch, useSelector }
