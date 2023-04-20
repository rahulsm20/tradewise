import React from 'react'
import Navbar from './Navbar'
import BudgetBody from './BudgetBody'
import Footer from './Footer'
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