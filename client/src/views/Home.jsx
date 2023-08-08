import React from 'react'
import Navbar from '../components/Navbar'
import DashboardBody from '../components/DashboardBody'
import Footer from '../components/Footer'
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