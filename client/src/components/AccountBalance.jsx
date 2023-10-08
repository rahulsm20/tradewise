import React,{useState,useEffect} from 'react'
import axios from 'axios'

const AccountBalance = () => {
  const [balance,setBalance]=useState('')
  const [amount,setAmount]=useState()
  const [loading,setLoading]=useState(true)
  const username = localStorage.getItem('username') 
  
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_SERVER_URL}/balance/get?username=${username}`)
    .then((res)=>
    { if (JSON.stringify(res.data[0].acc_balance)!=JSON.stringify(balance)){
    setBalance(res.data[0].acc_balance)
  }})
    .then(()=>setLoading(false))
    .catch((err)=>console.log(err))
  },[balance])
  
  const handleUpdate = (username) => {
    axios.patch(`${import.meta.env.VITE_SERVER_URL}/balance/update?username=${username}&balance=${amount}`)
    .then(()=>alert('Updated balance'))
    .catch((err)=>console.log(err))
  };

  return (
    <div className="card w-76 bg-slate-900 acc-balance">
    <div className="card-body justify-center gap-4">
      <h2 className="card-title justify-center">Account balance</h2>
      {
        loading || balance===null  ?          
        <progress className="progress w-56"></progress>        
        :
        <h1>{balance.toLocaleString('en-IN',{style:"currency",currency:"INR"})} </h1>
      }
        <div className='mt-5'>
<label htmlFor="my-modal4" className="btn btn-primary">Change balance</label>
<input type="checkbox" id="my-modal4" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
  <form className='flex flex-col gap-4 m-3'>
        <input type='number' placeholder='Balance' className='input input-bordered' value={amount} onChange={(event) => {
              setAmount(event.target.value);
            }}></input>
          </form>
          <label htmlFor="my-modal4" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <div className="modal-action">
      {
        balance ?
        <label htmlFor="my-modal4" className="btn" onClick={()=>handleUpdate(username)}>Update Balance</label>
        :
        <label htmlFor="my-modal4" className="btn" onClick={()=>handleUpdate(username)}>Add Balance</label>

      }
        </div>
    </div>
  </div>
</div>
    </div>
  
  </div>  )
}

export default AccountBalance