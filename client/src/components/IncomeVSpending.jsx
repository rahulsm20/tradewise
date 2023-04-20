import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { BarChart, ResponsiveContainer,Bar,XAxis,YAxis,Tooltip } from 'recharts'
const IncomeVSpending = () => {
  const [loading,setLoading]=useState(true)
  const [spending,setSpending]=useState([])
  const [incomes,setIncomes]=useState([])
  const [totalSpending,setTotalSpending]=useState(0)
  const [totalIncome,setTotalIncome]=useState(0)
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_SERVER_URL}/spending/get`)
    .then((res)=>{if (JSON.stringify(res.data)!=JSON.stringify(spending)){
      setSpending(res.data)}})
    .catch((err)=>console.log(err))
  },[spending])
  
useEffect(()=>{
  axios.get(`${import.meta.env.VITE_SERVER_URL}/income/get`)
  .then((res)=>{if (JSON.stringify(res.data)!=JSON.stringify(incomes)){
    setIncomes(res.data)}})
  .then(()=>setLoading(false))
  .catch((err)=>console.log(err))
},[incomes])


    useEffect(()=>{
      let totalI=0
      spending.map((category)=>{
        totalI=totalI+category.amount;
      });
      setTotalSpending(totalI)
    },[spending])
    useEffect(()=>{
      let total=0
      incomes.map((income)=>{
        total=total+income.amount;
      });
      setTotalIncome(total)
    },[incomes])
  const data=[{name:"income",value:totalIncome},{name:"spendings",value:totalSpending}]
  return (
    <div>
     <h2 className='text-2xl'>
        Income & spending
        </h2>   
        <div className='mt-5'>
        {
          loading ?
          <p> loading...</p>
          :
          <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
        </ResponsiveContainer>
        }
        </div>
    </div>
  )
}

export default IncomeVSpending