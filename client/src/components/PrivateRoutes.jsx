import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { setAuthenticated, setUser } from '../store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { decodeUser } from '../api'

const PrivateRoutes = () => {
    const dispatch = useDispatch();
    const sessionToken = sessionStorage.getItem("sessionToken")
    const checkAuth = async()=>
    {
        if(!sessionToken){
            return
        }
        const result = await decodeUser(sessionToken);
        if(!result){
            return
        }
        else{
            dispatch(setAuthenticated(true))
            dispatch(setUser(result))
        }
    } 
    checkAuth();
    const auth = useSelector((state)=>state.auth.isAuthenticated)
  return (
    // auth ? 
    <Outlet/>
  )
}

export default PrivateRoutes