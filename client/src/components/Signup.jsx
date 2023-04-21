// import React,{useState} from 'react'
// import { useNavigate } from 'react-router'
// const Signup = () => {
//     const [username,setUsername]=useState('')
//     const[password,setPassword]=useState('')
//     const[confirmPassword,setConfirmPassword]=useState('')
//     const[email,setEmail]=useState('')
//     const navigate = useNavigate()
//     const handleForm = () =>{
//             navigate('/home')
//             localStorage.setItem('username',username)
//             // localStorage.setItem('use',username)
//     }
//   return (
//     <div className='p-5 login-form text-white'>
//     <div className='d-flex flex-row justify-content-center align-items-center'>
//     <h2> Welcome to <span className='text-warning'> Tradewise </span> </h2>
//     </div>
//     <img src='../../public/logo.png' className='col-2'/>
//     <h5 className='mt-3'>Login</h5>
//     <hr/>
//     <form className='d-flex flex-column gap-4 justify-content-center align-items-center mt-5' onSubmit={handleForm}>
//         <input placeholder='username' className='p-3 login-input' onChange={(event)=>setUsername(event.target.value)} required></input>
//         <input placeholder='email' type='email' className='p-3 login-input' onChange={(event)=>setEmail(event.target.value)} required></input>
//         <input placeholder='password' type='password' className='p-3 login-input' onChange={(event)=>setPassword(event.target.value)} required></input>
//         <input placeholder='confirm password' type='password' className='p-3 login-input' onChange={(event)=>setConfirmPassword(event.target.value)} required></input>
//         <button className='btn bg-black text-white p-3 login-submit' onClick={()=>handleForm}>Create account ➡️</button>
//     </form>
//     <p className='mt-3'>Already have an account?
//     <span>
//     <a className='text-primary' href='/'> Log in here</a>
//     </span>
//     </p>
// </div>
//   )
// }

// export default Signup

import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [failed,setFailed]=useState(false)

    const navigate = useNavigate();

    const handleForm = () => {
        event.preventDefault();
        if (password==confirmpassword){
          axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/signup`,{
            email:email,
            password:password
          })
          .then((result)=>{
            localStorage.setItem('username',email.slice(0,5))
            sessionStorage.setItem('sessionToken',result.data.token)
            navigate('/news');})
            .catch((err)=>{
              console.log(err)
              setFailed(true)
            })
            console.log(email,password)
          }
        else{
          alert('Please enter same passwords')
        }
    };

    return (
        <div className='flex justify-center w-screen'>
        <div className='p-10 bg-slate-950 text-white flex-col align-center justify-center rounded-xl card border-2 border-slate-700'>
            <div className='flex flex-row justify-center items-center'>
                <h2 className='text-2xl'> Welcome to <span className='text-yellow-400 font-thin'>Tradewise</span></h2>
            </div>
            <img src='../../public/logo.png' className='login-logo' alt='logo' />
            <p className='mt-3 text-xl'>Signup</p>
            <hr />
            <form className='flex flex-col gap-4 justify-center items-center mt-5' onSubmit={handleForm}>
                <input placeholder='Email' type="email" className='p-3 rounded-lg w-64 input input-bordered' onChange={(event) => setEmail(event.target.value)} required />
                <input placeholder='Password' type='password' className='p-3 rounded-lg w-64 input input-bordered' onChange={(event) => setPassword(event.target.value)} required />
                <input placeholder='Confirm password' type='password' className='p-3 rounded-lg w-64 input input-bordered' onChange={(event) => setConfirmPassword(event.target.value)} required />
                <button className='bg-gray-800 text-white rounded-lg p-3 btn btn-primary' onClick={handleForm}>Signup ➡️</button>
            </form>
            <p className='mt-3'>
                Already have an account? <a className='text-blue-500' href='/'>Login here</a>
            </p>
            {failed ? <span className='text-red-900'>Please enter valid credentials</span> : <></>}
        </div>
        </div>
    );
};

export default Login;
