import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [failed,setFailed]=useState(false)

    const navigate = useNavigate();

    const handleForm = () => {
        event.preventDefault();
        if (password==confirmpassword){
          axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/signup`,{
            username:username,
            email:email,
            password:password
          })
          .then((result)=>{
            localStorage.setItem('username',username)
            sessionStorage.setItem('sessionToken',result.data.token)})
            .then(()=>
            navigate('/news'))
            .catch((err)=>{
              setError(err.response.data.errors[0].msg)
              setFailed(true)
            })
            console.log(email,password,confirmpassword)
          }
        else{
          alert('Please enter same passwords')
        }
    };

    return (
        <div className='flex justify-center w-screen pt-10'>
        <div className='p-10 bg-slate-950 text-white flex-col items-center gap-4 justify-center rounded-xl card border-2 border-slate-700'>
            <div className='flex flex-row justify-center items-center'>
                <h2 className='text-2xl'> Welcome to <span className='text-yellow-400 font-thin'>Tradewise</span></h2>
            </div>
            <img src='/logo.png' className='w-10' alt='logo' />
            <p className='mt-3 text-xl'>Signup</p>
            <hr />
            <form className='flex flex-col gap-4 justify-center items-center mt-5' onSubmit={handleForm}>
                <input placeholder='Username' type="text" className='p-3 rounded-lg w-64 input input-bordered' onChange={(event) => setUsername(event.target.value)} required />
                <input placeholder='Email' type="email" className='p-3 rounded-lg w-64 input input-bordered' onChange={(event) => setEmail(event.target.value)} required />
                <input placeholder='Password' type='password' className='p-3 rounded-lg w-64 input input-bordered' onChange={(event) => setPassword(event.target.value)} required />
                <input placeholder='Confirm password' type='password' className='p-3 rounded-lg w-64 input input-bordered' onChange={(event) => setConfirmPassword(event.target.value)} required />
                <button className='bg-gray-800 text-white rounded-lg p-3 btn btn-primary normal-case' onClick={handleForm}>Signup ➡️</button>
            </form>
            <p className='mt-3'>
                Already have an account? <a className='text-blue-500' href='/'>Login here</a>
            </p>
            {failed ? <span className='text-red-500'>{error}</span> : <></>}
        </div>
        </div>
    );
};

export default Login;
