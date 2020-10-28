import React from 'react'
import { useSelector, useDispatch } from 'react-reduce-hooks'

const Counter = () => {
  console.count('counter')
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
