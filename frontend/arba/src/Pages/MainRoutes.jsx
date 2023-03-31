import React from 'react'
import Navbar from '../Components/Navbar'
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage"
import Login from './Login';
import Signup from './Signup';
import ResetPass from './ResetPass';

const MainRoutes = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup />} />
            <Route path='Resetpassword' element={<ResetPass/>} />
        </Routes>
    </div>
  )
}

export default MainRoutes