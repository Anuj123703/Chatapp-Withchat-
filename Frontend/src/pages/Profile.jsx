import React from 'react'
import dp from '../assets/dp.png'
import { FaCameraRetro } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import axios from 'axios'
import { API_URL } from '../config.js'
import { useDispatch } from 'react-redux'
import { setUserData } from '../Redux/userSlice.js'
import { useEffect } from 'react'


const Profile = () => {
  let navigate = useNavigate()
  let userData = useSelector((state) => state.user?.userData);
  let dispatch = useDispatch()

  let [name, setname] = useState(userData?.name || "")
  let [frontendimage, setfrontendimage] = useState(userData?.image || dp)
  let [backendimage, setbackendimage] = useState(null)
  let [loading, setloading] = useState(false)

  let image = useRef()

  const handleimage = (e) => {
    let file = e.target.files[0]
    setbackendimage(file)
    setfrontendimage(URL.createObjectURL(file))
  }

  const handleprofile = async (e) => {
    e.preventDefault()
    setloading(true)
    try {
      let formdata = new FormData()
      formdata.append("name", name)
      if (backendimage) {
        formdata.append("image", backendimage)
      }
      let res = await axios.put(`${API_URL}/api/user/profile`, formdata,
        { withCredentials: true }
      )
      setloading(false)
      // Update the user data in the Redux store
      dispatch(setUserData(res.data))
      navigate("/")
    } catch (error) {
      console.error("Error updating profile:", error)
      setloading(false)
    }
  }
  return (
    <div className=' w-full h-[100vh] flex flex-col justify-center items-center bg-blue-100 '>
      <div className='absolute top-5 left-5 '>
        <FaHome
          className='h-[20px] w-[20px] cursor-pointer  '
          onClick={() => navigate("/")}
        />
      </div>

      <div className=' relative rounded-full shadow-gray-200 shadow-2xl border-2 border-blue-400 '>
        <div className=' w-[200px] h-[200px] rounded-full overflow-hidden '>
          <img
            src={frontendimage}
            alt="Profile"
            className='h-full w-full object-cover '
          />
        </div>
        <FaCameraRetro
          className='absolute bottom-2 left-1/2 transform -translate-x-1/2 cursor-pointer  '
          onClick={() => image.current?.click()}
        />
      </div>
      <div className='w-[400px] bg-blue-100 p-6 mt-9 rounded-b-3xl shadow-2xl border border-blue-400 '>
        <form
          className='flex flex-col gap-1'
          onSubmit={handleprofile}
        >
          <input
            type="file"
            accept="image/*"
            ref={image}
            onChange={handleimage}
            hidden
          />
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setname(e.target.value)}
            value={name}
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
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

        </form>
      </div>

    </div>
  )
}
export default Profile
