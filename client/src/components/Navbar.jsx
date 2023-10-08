import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { setAuthenticated } from '../store/authSlice'
import LogoutModal from './LogoutModal'
const Navbar = () => {
  const navigate = useNavigate()
  const user = useSelector((state)=>state.auth.user)
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
  const dispatch = useDispatch();
  const handleLogout=()=>{
    // alert('You are about to be logged out!')
    dispatch(setAuthenticated(false))
    localStorage.clear()
    sessionStorage.clear()
    navigate('/')
  }
  return (
  <div className="navbar sticky top-0 left-0 z-10">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li><Link to='/' className='hover:text-slate-500'>News</Link></li>
      <li><Link to='/dashboard' className='hover:text-slate-500'>Dashboard</Link></li>
      <li><Link to='/budget' className='hover:text-zinc-950'>Budget</Link></li>
    </ul>
    </div>
    <img src='/logo.svg' alt="logo" title="logo" className=''/>
    <a className="btn btn-ghost normal-case  hover:text-slate-950 title lg:text-3xl sm:text-xl">tradewise</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link to='/news' className='hover:text-white hover:bg-primary'>News</Link></li>
      <li><Link to='/dashboard' className='hover:text-white hover:bg-primary'>Dashboard</Link></li>
      <li><Link to='/budget' className='hover:text-white hover:bg-primary'>Budget</Link></li>
    </ul>
  </div>
  <div className='navbar-end'>
    {
      isAuthenticated ?
    <div className="gap-4 items-center flex flex-col md:flex-row">
      <p className='text-sm p-2'>
    {user.username}
    </p>
    <LogoutModal handleLogout={handleLogout}/>
    </div>
    :
    <div className="hover:underline">
            <Link to="/login">
              <button className="btn btn-transparent hover:bg-white bg-slate-200 normal-case text-black btn-sm text-sm">
                Login
                <img src="/arrow-right.svg" className="w-5" />
              </button>
            </Link>
          </div>
    }
  </div>
</div>
  )
}

export default Navbar