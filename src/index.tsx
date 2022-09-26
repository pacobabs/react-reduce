import React, { useReducer, ReactNode, Dispatch } from 'react'
import { useContext, createContext, useContextSelector, Context } from 'use-context-selector'

type Props = {
  store: any
  dispatch: Dispatch<any>
  context?: Context<any>
  equalityFn?: (a: any, b: any) => boolean
  children: ReactNode
}

let StateContext: Context<any>
let DispatchContext: Context<Dispatch<any>>

const Provider = (props: Props) => {
  const { context, store, dispatch, children } = props
  initContext(context)
  return (
    <StateContext.Provider value={store}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  )
}

const initContext = (context?: Context<any>) => {
  if (StateContext && DispatchContext) return
  StateContext = Array.isArray(context) ? context[0] : context || createContext(undefined)
  DispatchContext = Array.isArray(context) && context.length > 1 ? context[1] : createContext(undefined)
}

const createStore = (reducer: any, initialState?: any) => {
  return initialState === undefined ? useReducer(reducer, initialState, reducer) : useReducer(reducer, initialState)
}

const useDispatch = (Context: Context<any> = DispatchContext) => {
  return useContext(Context)
}

const useSelector = (selector: (state: any) => any, Context: Context<any> = StateContext) => {
  return useContextSelector(Context, selector)
}

const useStore = (Context: Context<any> = StateContext) => {
  return useContext(Context)
}

export { Provider, createContext, createStore, useStore, useDispatch, useSelector }
