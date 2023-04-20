import React,{useState,useEffect} from 'react'
import axios from 'axios'
const Spendings = () => {
 const [category,setCategory]=useState('')
  const [amount,setAmount]=useState('')
  const [spendings,setSpendings]=useState([])
  const [loading,setLoading] =useState(true)
  const handleAdd=()=>{
    axios.post(`${import.meta.env.VITE_SERVER_URL}/spending/add`,{
      category:category,
      amount:amount
    })
    .then(()=>console.log('Added category'))
    .catch((err)=>console.log(err))
  }
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_SERVER_URL}/spending/get`)
    .then((res)=>{if (JSON.stringify(res.data)!=JSON.stringify(spendings)){
      setSpendings(res.data)}})
    .then(()=>setLoading(false))
    .catch((err)=>console.log(err))
  },[])

  const handleRemoveSpending=((name)=>{
    axios.delete(`${import.meta.env.VITE_SERVER_URL}/spending/delete`,{
      data:{category:name}
    })
    .then(()=>alert('Spending category deleted'))
    .catch((err)=>console.log(err))
  })
  return (
    <div className='p-2 rounded-lg'>
     <h2 className='text-2xl mb-5'>
      Spendings
      </h2> 
      <hr/>
      <div className='grid grid-cols-2 p-3 gap-4'>
        {
          loading ?
          <progress className="progress w-56"></progress>
          :
         spendings.map((spending,key)=>{
          return(
            <div className='card p-3 bg-gray-900 hover:bg-gray-700 justify-center' key={key}>
            <p className='text-sm'>
            {spending.category}
            </p>
            <span className='text-xl'>
            {spending.amount.toLocaleString('en-IN',{style:"currency",currency:"INR"})}
            </span>
            <button className='btn btn-error rounded-lg btn-sm mt-3' onClick={()=>handleRemoveSpending(spending.category)}>Remove</button>
            </div>
         )
        }) 
      }
      </div>
      <div className='mt-5'>
<label htmlFor="my-modal2" className="btn">Add spending </label>
<input type="checkbox" id="my-modal2" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
  <form className='flex flex-col gap-4 m-3'>
        <input type='text' placeholder='Category' className='input input-bordered' value={category} onChange={(event) => {
              setCategory(event.target.value);
            }}></input>
        <input type='number' placeholder='Total amount' className='input input-bordered' value={amount} onChange={(event) => {
              setAmount(event.target.value);
            }}></input>
          </form>
          <label htmlFor="my-modal2" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <div className="modal-action">
      <label htmlFor="my-modal2" className="btn" onClick={()=>handleAdd()}>Add</label>
        </div>
    </div>
  </div>
</div>      
</div>
  )
}

export default Spendings