import React from 'react'
import {useSelector} from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'
const PrivateRoute = ({children}) => {
    const {user} = useSelector((state)=>({...state.auth}))
  return (
    <div>{user ? children : <LoadingToRedirect/>}</div>
  )
}

export default PrivateRoute