import React from 'react'
import Navbar from './Navbar'
import DashboardBody from './DashboardBody'
import Footer from './Footer'
const Home = () => {
  return (
    <div className='w-screen'>
    <Navbar/>
    <DashboardBody/>
    <Footer/>
    </div>
  )
}

export default Home