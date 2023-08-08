import React from 'react'
import Navbar from '../components/Navbar'
import BudgetBody from '../components/BudgetBody'
import Footer from '../components/Footer'
const Budget = () => {
  return (
    <div className='h-screen w-screen'>
        <Navbar/>
        <BudgetBody/>
        <Footer/>
    </div>
  )
}

export default Budget