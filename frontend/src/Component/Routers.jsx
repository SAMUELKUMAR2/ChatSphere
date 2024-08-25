import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home.jsx'
import LoginPage from './LoginPage.jsx'
import Signup from './Signup.jsx'
import HomePage from '../HomePage.jsx'
import NewContact from '../container/NewContact.jsx'
const Routers = () => {
  return (
    <>
    <BrowserRouter>
    
    <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path='/login' element ={<LoginPage />} />
        <Route path='/admin/signup' element ={<Signup />} />
        <Route path='/admin/:id' element ={<HomePage />} />
        <Route path='/admin/:id/newContact' element ={<NewContact />} />
    
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default Routers