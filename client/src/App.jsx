import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import PrivateRoutes from './components/PrivateRoutes'
import Budget from './views/Budget'
import Home from './views/Home'
import Login from './views/Login'
import News from './views/News'
import Signup from './views/Signup'
function App() {
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
  return (
    <Routes className="App">
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route element={<PrivateRoutes/>}>
      <Route path='/' element={ <News/>} />
      <Route path='/budget' element={<Budget/>}/>
      <Route path='/dashboard' element={ <Home/>}/>
      </Route>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  )
}

export default App
