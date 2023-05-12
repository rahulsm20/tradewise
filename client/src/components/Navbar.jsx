import React from 'react'
import {useNavigate} from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  const handleLogout=()=>{
    alert('You are about to be logged out!')
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
      <li><a href='/' className='hover:text-slate-500'>News</a></li>
      <li><a href='/dashboard' className='hover:text-slate-500'>Dashboard</a></li>
      <li><a href='/budget' className='hover:text-zinc-950'>Budget</a></li>
    </ul>
    </div>
    <img src='/logo.svg' alt="logo" title="logo" className=''/>
    <a className="btn btn-ghost normal-case  hover:text-slate-950 title lg:text-3xl sm:text-xl">tradewise</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a href='/news' className='hover:text-zinc-950'>News</a></li>
      <li><a href='/dashboard' className='hover:text-zinc-950'>Dashboard</a></li>
      <li><a href='/budget' className='hover:text-zinc-950'>Budget</a></li>
    </ul>
  </div>
  <div className='navbar-end'>
    <p className='text-sm p-2'>
    {localStorage.getItem('username')}
    </p>
    <button className='lg:btn sm:btn-sm hover:bg-primary' onClick={handleLogout}>Logout</button>
  </div>
</div>
  )
}

export default Navbar