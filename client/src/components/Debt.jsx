import React,{useState,useEffect} from 'react'
import axios from 'axios'
const Debt = () => {
    const [debtcategory,setDebtCategory]=useState('')
    const [amount,setAmount]=useState('')
    const [debts,setDebts]=useState([])
    const [loading,setLoading] =useState(true)
    const handleAdd=()=>{
      axios.post(`${import.meta.env.VITE_SERVER_URL}/debt/add`,{
        debtCategory:debtcategory,
        amount:amount
      })
      .then(()=>console.log('Added income'))
      .catch((err)=>console.log(err))
    }
    useEffect(()=>{
      axios.get(`${import.meta.env.VITE_SERVER_URL}/debt/get`)
      .then((res)=>{{
        setDebts(res.data);
      }
    })
      .then(()=>setLoading(false))
      .catch((err)=>console.log(err))
    },[debts])
  
    const handleRemove=(income)=>{
      axios.delete(`${import.meta.env.VITE_SERVER_URL}/debt/delete`,{
      data:{debtCategory:income}
      })
      .then((res)=>alert('Income source deleted'))
      .catch((err)=>alert('Source could not be deleted'))
    }
    return (
      <div className='flex flex-col rounded-3xl p-4'>
          <h2 className='text-2xl mb-3'>Debt</h2>
          <div className='grid grid-cols-2 p-3 gap-4'>
          {
            loading ?
            <progress className="progress w-56"></progress>
            :
           debts.map((income,key)=>{
            return(
              <div className='card p-5 gap-3 hover:bg-zinc-800 justify-center grid grid-cols-2' key={key}>
              <p className='text-sm'>
              {income.category}
              </p>
              <span className='text-xl'>
              {income.amount.toLocaleString('en-IN',{style:"currency",currency:"INR"})}
              </span>
              <button className='btn btn-error rounded-lg btn-sm' onClick={()=>handleRemove(income.category)}>Remove</button>
              </div>
           )
          }) 
        }
        </div>
          <div className='mt-5'>
  <label htmlFor="my-modal6" className="btn">Add debt</label>
  <input type="checkbox" id="my-modal6" className="modal-toggle" />
  <div className="modal">
    <div className="modal-box">
    <form className='flex flex-col gap-4 m-3'>
          <input type='text' placeholder='Debt Category' className='input input-bordered' value={debtcategory} onChange={(event) => {
                setDebtCategory(event.target.value);
              }}></input>
          <input type='number' placeholder='Total debt' className='input input-bordered' value={amount} onChange={(event) => {
                setAmount(event.target.value);
              }}></input>
            </form>
            <label htmlFor="my-modal6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <div className="modal-action">
        <label htmlFor="my-modal6" className="btn" onClick={()=>handleAdd()}>Add</label>
          </div>
      </div>
    </div>
  </div>
      </div>
  )
}

export default Debt