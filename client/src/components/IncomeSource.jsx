import React,{useState,useEffect} from 'react'
import axios from 'axios'
const IncomeSource = () => {
  const [name,setName]=useState('')
  const [amount,setAmount]=useState('')
  const [incomes,setIncomes]=useState([])
  const [loading,setLoading] =useState(true)
  const handleAdd=()=>{
    axios.post(`${import.meta.env.VITE_SERVER_URL}/income/add`,{
      name:name,
      amount:amount
    })
    .then(()=>console.log('Added income'))
    .catch((err)=>console.log(err))
  }
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_SERVER_URL}/income/get`)
    .then((res)=>
    { if (JSON.stringify(res.data)!=JSON.stringify(incomes)){
      setIncomes(res.data)}})
    .then(()=>setLoading(false))
    .catch((err)=>console.log(err))
  },[incomes])

  const handleRemove=(income)=>{
    axios.delete(`${import.meta.env.VITE_SERVER_URL}/income/delete`,{
    data:{name:income}
    })
    .then((res)=>alert('Income source deleted'))
    .catch((err)=>alert('Source could not be deleted'))
  }
  return (
    <div className='flex flex-col bg-zinc-950 rounded-3xl p-4'>
        <h2 className='text-2xl mb-3'>Income Source</h2>
        <hr/>
        <div className='grid grid-cols-2 p-3 gap-4'>
        {
          loading ?
          <progress className="progress w-56"></progress>
          :
         incomes.map((income,key)=>{
          return(
            <div className='card p-5 gap-3 hover:bg-zinc-800 justify-center grid grid-cols-2' key={key}>
            <p className='text-sm'>
            {income.name}
            </p>
            <span className='text-xl'>
            {income.amount.toLocaleString('en-IN',{style:"currency",currency:"INR"})}
            </span>
            <button className='btn btn-error rounded-lg btn-sm' onClick={()=>handleRemove(income.name)}>Remove</button>
            </div>
         )
        }) 
      }
      </div>
        <div className='mt-5'>
<label htmlFor="my-modal" className="btn">Add income source</label>
<input type="checkbox" id="my-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
  <form className='flex flex-col gap-4 m-3'>
        <input type='text' placeholder='Source name' className='input input-bordered' value={name} onChange={(event) => {
              setName(event.target.value);
            }}></input>
        <input type='number' placeholder='Total income from source' className='input input-bordered' value={amount} onChange={(event) => {
              setAmount(event.target.value);
            }}></input>
          </form>
          <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <div className="modal-action">
      <label htmlFor="my-modal" className="btn" onClick={()=>handleAdd()}>Add</label>
        </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default IncomeSource