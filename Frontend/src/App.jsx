import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import useGetCurrentUser from './currentHooks/getCurrentUser.jsx'
import { useSelector } from 'react-redux'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import getOtherUsers from './currentHooks/getOtherUsers.jsx'


function App() {
  useGetCurrentUser(); // ✅ custom hook call
  getOtherUsers()

  const userData = useSelector((state) => state.user?.userData); 

  return (
    <Routes>
      <Route path="/" element={userData ? <Home /> : <Navigate to="/login" />} />
      console.log("USER DATA:", userData);
      <Route path="/profile" element={userData ? <Profile /> : <Navigate to="/register" />} />
      <Route path="/login" element={!userData ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!userData?<Register /> : <Navigate to="/profile" />} />
    </Routes> 
  )
}

export default App