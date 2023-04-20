import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import News from './components/News'
import Login from './components/Login'
import Budget from './components/Budget'
import Signup from './components/Signup'
import { Routes,Route } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes className="App">
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/news' element={<News/>}/>
      <Route path='/budget' element={<Budget/>}/>
      <Route path='/dashboard' element={<Home/>}/>
    </Routes>
  )
}

export default App
