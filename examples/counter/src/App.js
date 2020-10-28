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
