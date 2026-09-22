import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import dp from '../assets/dp.png'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setselectedUser } from '../Redux/userSlice';

const MessageArea = () => {
  let  {selectedUser} =useSelector(state=>state.user)
  let dispatch = useDispatch();
  return (
    <div className={`md:w-[70%] w-full ${selectedUser ? "flex" : "hidden md:flex"} flex-col h-screen bg-gray-100 border-l-2`}>
      {selectedUser && 
        <div className="w-full h-[100px] bg-blue-400 rounded-b-[30px] shadow-2xl p-[20px] flex items-center gap-[20px]">
          <FaArrowLeft
            className="w-[20px] h-[20px] cursor-pointer text-white hover:text-black  "
            onClick={() => dispatch(setselectedUser(null))}
          />

          <div className="w-[50px] h-[50px] rounded-full bg-white overflow-hidden">
            <img
              src={selectedUser?.image || dp}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <h1
            className="font-bold text-white text-[20px]"
          >
            {selectedUser?.name || "User"}
          </h1>

        </div>
      }
      {!selectedUser && (
        <div className="flex h-full w-full items-center justify-center bg-slate-50/50 p-6">
          <div className="flex max-w-sm flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 p-8 text-center shadow-sm backdrop-blur-sm">
            {/* CSS-only pulsing status indicator */}
            <div className="relative mb-4 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-indigo-500"></span>
            </div>

            <h2 className="text-xl font-semibold text-slate-800 tracking-tight">
              No Chat Selected
            </h2>

            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Choose a contact from your list on the left to start messaging.
            </p>
          </div>
        </div>
      )
      }
    </div>
         
  )
}

export default MessageArea