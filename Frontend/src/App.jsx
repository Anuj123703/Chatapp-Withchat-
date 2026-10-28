import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import useGetCurrentUser from './currentHooks/getCurrentUser.jsx'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import getOtherUsers from './currentHooks/getOtherUsers.jsx'
import {io} from "socket.io-client"
import { API_URL } from './config.js'
import { setOnlineUsers, setSocket } from './Redux/userSlice.js'



function App() {
  useGetCurrentUser(); // ✅ custom hook call
  getOtherUsers()

  const { userData, socket, onlineUsers } = 
  useSelector((state) => state.user); 
  let dispatch = useDispatch()
  useEffect(() => {
    if (userData){
      const socket = io(API_URL, {
        query: {
          userId: userData._id
        }
      })
      dispatch(setSocket(socket))
      socket.on("getOnlineUser", (user) => {
        dispatch(setOnlineUsers(user))
      })
      return () => socket.close()
    }else{
      if(socket){
        socket.close()
        dispatch(setSocket(null))
      }
    }
   

  }, [userData?._id]);

  return (
    <Routes>
      <Route path="/" element={userData ? <Home /> : <Navigate to="/login" />} />
      <Route path="/profile" element={userData ? <Profile /> : <Navigate to="/register" />} />
      <Route path="/login" element={!userData ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!userData?<Register /> : <Navigate to="/profile" />} />
    </Routes> 
  )
}

export default App