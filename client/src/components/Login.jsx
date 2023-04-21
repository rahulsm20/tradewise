import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [failed,setFailed]=useState(false)
    const navigate = useNavigate();

    const handleForm = () => {
        event.preventDefault();
        axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`,{
            email:email,
            password:password
        })
        .then((result)=>{
            localStorage.setItem('username',email.slice(0,5))
            sessionStorage.setItem('sessionToken',result.data.token)
            navigate('/news')})
            .catch((err)=>{
            setFailed(true)
            console.log(err)
            })
            console.log(email,password)
    };

    return (
        <div className='flex justify-center w-screen'>
        <div className='p-10 bg-slate-950 text-white flex-col align-center justify-center rounded-xl card'>
            <div className='flex flex-row justify-center items-center'>
                <h2 className='text-2xl'> Welcome to <span className='text-yellow-400 font-thin'>Tradewise</span></h2>
            </div>
            <img src='/logo.png' className='login-logo' alt='logo' />
            <p className='mt-3 text-xl'>Login</p>
            <hr />
            <form className='flex flex-col gap-4 justify-center items-center mt-5' onSubmit={handleForm}>
                <input placeholder='Email' type="email" className='p-3 rounded-lg w-64 input input-bordered' onChange={(event) => setEmail(event.target.value)} required />
                <input placeholder='Password' type='password' className='p-3 rounded-lg w-64 input input-bordered' onChange={(event) => setPassword(event.target.value)} required />
                <button className='bg-gray-800 text-white rounded-lg p-3 btn btn-primary' onClick={handleForm}>Submit ➡️</button>
            </form>
            <p className='mt-3'>
                Don't have an account? <a className='text-blue-500' href='/signup'>Sign up here</a>
            </p>
            {failed ? <span className='text-red-900'>Please enter valid credentials</span> : <></>}
        </div>
        </div>
    );
};

export default Login;
