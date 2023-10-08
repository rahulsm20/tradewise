import React, { useState } from 'react'
import { insertStock } from '../api'
import { useSelector,useDispatch } from 'react-redux';

const InsertStock = () => {
  const [stock,setStock] = useState("");
  const dispatch = useDispatch();
  const user_id = useSelector((state)=>state.auth.user.user_id)
  const handleSubmit = (event)=>{
    event.preventDefault();
    try{
      insertStock(user_id,stock)
      location.reload()
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <form className='flex flex-col gap-4 w-1/2' onSubmit={handleSubmit}>
        <label htmlFor='stock'>Add new stock</label>
        <div className='input-group'>
        <input placeholder='Insert stock' name="stock" id="stock" type="text" className='input' onChange={(event)=>setStock(event.target.value)}/>
        <button className='btn'>
        <img src='/add.svg' className='w-5 bg-neutral' type="submit" onClick={handleSubmit}/> 
        </button>
        </div>
    </form>
  )
}

export default InsertStock  