import React,{useState,useEffect} from 'react'
import axios from 'axios'
const Assets = () => {
  const [name,setName]=useState('')
  const [amount,setAmount]=useState('')
  const [assets,setAssets]=useState([])
  const [loading,setLoading] =useState(true)
  const handleAdd=()=>{
    axios.post(`${import.meta.env.VITE_SERVER_URL}/assets/add`,{
      asset:name,
      amount:amount
    })
    .then(()=>console.log('Added asset'))
    .catch((err)=>console.log(err))
  }
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_SERVER_URL}/assets/get`)
    .then((res)=>{{
      setAssets(res.data)}})
    .then(()=>setLoading(false))
    .catch((err)=>console.log(err))
  },[assets])

  const handleRemove=(income)=>{
    axios.delete(`${import.meta.env.VITE_SERVER_URL}/assets/delete`,{
    data:{name:income}
    })
    .then((res)=>alert('Asset deleted'))
    .catch((err)=>alert('Asset could not be deleted'))
  }
  return (
    <div className='flex flex-col bg-zinc-950 rounded-3xl p-4'>
        <h2 className='text-2xl mb-3'>Assets</h2>
        <div className='grid grid-cols-2 p-3 gap-4'>
        {
          loading ?
          <progress className="progress w-56"></progress>
          :
         assets.map((asset,key)=>{
          return(
            <div className='card p-5 gap-3 hover:bg-zinc-800 justify-center grid grid-cols-2' key={key}>
            <p className='text-sm'>
            {asset.asset_name}
            </p>
            <span className='text-xl'>
            {asset.amount.toLocaleString('en-IN',{style:"currency",currency:"INR"})}
            </span>
            <button className='btn btn-error rounded-lg btn-sm' onClick={()=>handleRemove(asset.asset_name)}>Remove</button>
            </div>
         )
        }) 
      }
      </div>
        <div className='mt-5'>
<label htmlFor="my-modal3" className="btn">Add asset</label>
<input type="checkbox" id="my-modal3" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
  <form className='flex flex-col gap-4 m-3'>
        <input type='text' placeholder='Asset name' className='input input-bordered' value={name} onChange={(event) => {
              setName(event.target.value);
            }}></input>
        <input type='number' placeholder='Total value' className='input input-bordered' value={amount} onChange={(event) => {
              setAmount(event.target.value);
            }}></input>
          </form>
          <label htmlFor="my-modal3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <div className="modal-action">
      <label htmlFor="my-modal3" className="btn" onClick={()=>handleAdd()}>Add</label>
        </div>
    </div>
  </div>
</div>
    </div> 
  )
}

export default Assets