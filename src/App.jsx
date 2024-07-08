import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Brands from './Components/Brends/Brands'
import Categories from './Components/Categories/Categories'
import { ToastContainer } from 'react-toastify'
import Modals from './Components/Modals/Modals'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes path={'/'}>
      <Route index element={<Login/>} />
      <Route path='home' element={<Home/>} >
      <Route path='brands' element={<Brands/>} />
      <Route path ='modals' element={<Modals/>} />
      <Route path='Categories' element={<Categories/>} />
      </Route>
     </Routes>
     <ToastContainer />
    </>
  )
}

export default App
