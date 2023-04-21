import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import News from './components/News'
import Login from './components/Login'
import Budget from './components/Budget'
import Signup from './components/Signup'
import PrivateRoute from './utils/PrivateRoute'
import { Routes,Route,Navigate } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)
  const isAuthenticated = sessionStorage.getItem('sessionToken')
  return (
    <Routes className="App">
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/news' element={isAuthenticated ? <News/>: <Navigate to='/'/>} />
      <Route path='/budget' element={isAuthenticated ? <Budget/>: <Navigate to='/'/>}/>
      <Route path='/dashboard' element={isAuthenticated ? <Home/>: <Navigate to='/'/>}/>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  )
}

export default App
