import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import getCurrentUser from './currentHooks/getCurrentUser.jsx'

function App() {
  getCurrentUser() // Call the getCurrentUser function to fetch the current user data
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App