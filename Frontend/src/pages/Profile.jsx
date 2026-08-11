import React from 'react'
import dp from '../assets/dp.png'
import { FaCameraRetro } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'


const Profile = () => {
  let navigate = useNavigate()
  let userData = useSelector((state) => state.user?.userData);
  return (
    <div className=' w-full h-[100vh] flex flex-col justify-center items-center bg-blue-100 '>
      <div className='absolute top-5 left-5 '>
        <FaHome
        className='h-[20px] w-[20px] cursor-pointer '
        onClick={() => navigate("/")}
        />
      </div>

      <div className=' relative rounded-full shadow-gray-200 shadow-2xl border-2 border-blue-400 '>
        <div className=' w-[200px] h-[200px] rounded-full overflow-hidden '>
          <img
            src={dp}
            alt="Profile"
            className='h-[100%] object-cover ' />
        </div>
        <FaCameraRetro className='absolute bottom-2 left-1/2 transform -translate-x-1/2 cursor-pointer  ' />
      </div>
      <div className='w-[400px] bg-blue-100 p-6 mt-9 rounded-b-3xl shadow-2xl border border-blue-400 '>
        <form className='flex flex-col gap-1'>

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full mb-4 p-3 border border-blue-400 rounded-lg bg-blue-100 placeholder:text-black "
          />

          <input
            type="email"
            placeholder="Email"
            readOnly
            className="w-full mb-4 p-3 border border-blue-400 rounded-lg bg-blue-100 placeholder:text-black"
            value={userData?.email || ""}
          />

            <input
              type="text"
              placeholder="Username"
              readOnly
              className="w-full mb-6 p-3 border border-blue-400 rounded-lg bg-blue-100 placeholder:text-black"
              value={userData?.username || ""}
            />
            
        

          <button
            className="w-full bg-blue-100 font-bold text-black hover:bg-blue-400 hover:text-white p-3 rounded-lg"
            type="submit"
          >
            Update Profile
          </button>

        </form>
      </div>

    </div>
  )
}
export default Profile
