import React, { useEffect,useState } from 'react'
import Card from './Card'
import LineChart from './Linechart'
import axios from 'axios'

const DashboardBody = () => {
  const [stocks,setStock]=useState([])
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    axios.get(import.meta.env.VITE_SERVER_URL+"/stocks")
    .then((res)=>setStock(res.data))
    .then(()=>setLoading(false))
    .catch((err)=>console.log(err))
}, [])
  return (
    <div className='lg:m-10 xl:m-10 gap-4 flex flex-col p-10'>
      <h2 className='text-3xl sm:text-2xl'>
       Trending
       </h2> 
    <div className='gap-4 grid sm:flex-col md:grid-cols-2 lg:grid-cols-3'>
    {/* {loading ? 
        <progress className="progress w-56"></progress>        
    :stocks.map((stock,id)=>{
      return(
        <Card symbol={stock.symbol} key={id}/>
        )
      })} */}
      </div>
      <div className='my-12 '>
        <LineChart symbol1="MSFT" symbol2="NFLX" symbol3="AAPL"/>  
      </div>
    </div>
  )
}

export default DashboardBody