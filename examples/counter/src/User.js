import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-reduce-hooks'

const User = () => {
  useEffect(() => {
    console.count("User -------");
  });
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
