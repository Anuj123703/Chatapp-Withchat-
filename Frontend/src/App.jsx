import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'

import useGetCurrentUser from './currentHooks/getCurrentUser.jsx'
import getOtherUsers from './currentHooks/getOtherUsers.jsx'

import { useDispatch, useSelector } from 'react-redux'
import { io } from "socket.io-client"
import { API_URL } from './config.js'

import { setOnlineUsers } from './Redux/userSlice.js'
import { SocketContext } from './context/socketContext.jsx'

function App() {
  useGetCurrentUser();
  getOtherUsers();

  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!userData?._id) {
      setSocket(null);
      dispatch(setOnlineUsers([]));
      return;
    }

    const newSocket = io(API_URL, {
      withCredentials: true,
      query: {
        userId: userData._id
      }
    });

    setSocket(newSocket);

    newSocket.on("getOnlineUser", (users) => {
      console.log("ONLINE USERS FROM SERVER:", users);

      dispatch(setOnlineUsers(users));
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (error) => {
      console.log("Socket error:", error.message);
    });

    return () => {
      newSocket.disconnect();
    };

  }, [userData?._id, dispatch]);

  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path="/" element={userData ? <Home /> : <Navigate to="/login" />} />

        <Route path="/profile" element={userData ? <Profile /> : <Navigate to="/register" />} />

        <Route path="/login" element={!userData ? <Login /> : <Navigate to="/" />} />

        <Route path="/register" element={!userData ? <Register /> : <Navigate to="/profile" />} />
      </Routes>
    </SocketContext.Provider>
  )
}

export default App;