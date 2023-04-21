import {Outlet, Navigate } from 'react-router-dom'


const PrivateRoute = () => {
    let auth = {token : sessionStorage.getItem('sessionToken')}
  return (
    auth ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoute