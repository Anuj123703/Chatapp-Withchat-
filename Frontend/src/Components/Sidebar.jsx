import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import dp from '../assets/dp.png'
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { setOtherUsersData, setselectedUser, setUserData } from '../Redux/userSlice';
import { IoMdLogOut } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config.js';



const Sidebar = () => {
    let { userData, OtherUsersData } = useSelector((state) => state.user)
    let [search, setSearch] = useState(false)
    let { selectedUser } = useSelector(state => state.user)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlelogout = async () => {
        try {
            let result = await axios.get(
                `${API_URL}/api/auth/logout`,
                { withCredentials: true }
            );

            // Redux data clear
            dispatch(setUserData(null));
            dispatch(setOtherUsersData(null));

            // Login page
            navigate("/login");

        } catch (error) {
            console.log("Logout error:", error);
        }
    };
    return (
        <div className={`md:w-[30%] w-full ${selectedUser ? "hidden md:flex" : "flex"} flex-col bg-blue-100 h-screen `}>
            {/* for logout  */}
            <div
                className="fixed bottom-[20px] left-[20px] w-[50px] h-[50px] rounded-full flex justify-center items-center  bg-blue-400 overflow-hidden cursor-pointer"
                onClick={handlelogout}
            >
                <IoMdLogOut className="w-[25px] h-[25px] " />
            </div>
            <div className=" h-[40%] bg-blue-400 rounded-b-[40%] p-5 shadow-2xl">

                <div className="flex justify-between items-center">
                    <div className="p-5">
                        <h1 className="text-white text-2xl font-bold">
                            Withchat
                        </h1>

                        <p className="text-black p-1 text-xl font-extrabold">
                            😊 Welcome, {userData?.name || "User"}!
                        </p>
                    </div>

                    <div
                        onClick={() => navigate("/profile")}
                        className="border-2 mt-5 w-[70px] h-[70px] rounded-full overflow-hidden flex justify-center items-center shadow-lg shadow-gray-500">
                        <img
                            src={userData?.image || dp}
                            alt="Profile"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                <div className='w-full flex items-center gap-[20px] ' >
                    {!search &&
                        <div
                            className=" w-[50px] h-[50px] rounded-full flex justify-center items-center bg-white"
                            onClick={() => setSearch(true)}
                        >
                            <CiSearch className="w-[25px] h-[25px]" />
                        </div>}
                    {search &&
                        <form className="w-full h-[50px] flex justify-center items-center bg-white shadow-blue-500 gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px] ">
                            <CiSearch className="w-[25px] h-[25px] " />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full h-full outline-none px-2"
                            />
                            <FaArrowLeft
                                className='w-[25px] h-[25px] cursor-pointer '
                                onClick={() => setSearch(false)}
                            />

                        </form>
                    }
                    {!search &&
                        OtherUsersData?.map(
                            (user) => {
                                return (
                                    <div
                                        key={user._id}
                                        className=" w-[50px] h-[50px] rounded-full flex justify-center items-center bg-white overflow-hidden shadow-2xl">
                                        <img
                                            src={user.image || dp}
                                            alt=""
                                            className="h-full w-full object-cover "
                                        />
                                    </div>)
                            }
                        )}
                </div>

            </div>
            <div
                className=' mt-[20px] p-2 flex flex-col gap-[10px] justify-center '
            >
                {OtherUsersData?.map(
                    (user) => {
                        return (
                            <div
                                className=' border-2 border-blue-400 rounded-full bg-blue-200 flex items-center gap-[20px] shadow-2xl cursor-grab'
                                onClick={() => dispatch(setselectedUser(user))}
                                key={user._id}
                            >
                                <div className=" w-[50px] h-[50px] rounded-full  bg-white overflow-hidden ">
                                    <img
                                        src={user.image || dp}
                                        alt=""
                                        className="h-full w-full object-cover "
                                    />
                                </div>
                                <h1 className='font-extrabold' >{user.name || user.username}</h1>
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    )
}

export default Sidebar