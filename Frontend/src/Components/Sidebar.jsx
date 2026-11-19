
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dp from '../assets/dp.png'
import { CiSearch } from "react-icons/ci"
import { FaArrowLeft } from "react-icons/fa"
import { setOtherUsersData, setselectedUser, setUserData, setSearchdata } from '../Redux/userSlice'
import { IoMdLogOut } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config.js'

const Sidebar = () => {

    const {
        userData,
        OtherUsersData,
        onlineUsers,
        searchdata,
        selectedUser
    } = useSelector((state) => state.user)

    const [search, setSearch] = useState(false)
    const [inputSearch, setInputSearch] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Logout
    const handlelogout = async () => {
        try {
            await axios.get(
                `${API_URL}/api/auth/logout`,
                { withCredentials: true }
            )

            dispatch(setUserData(null))
            dispatch(setOtherUsersData(null))
            dispatch(setselectedUser(null))
            dispatch(setSearchdata([]))

            navigate("/login")

        } catch (error) {
            console.log("Logout error:", error)
        }
    }

    // Search Users
    const handleSearch = async (value) => {
        try {
            const result = await axios.get(
                `${API_URL}/api/user/search`,
                {
                    params: { search: value },
                    withCredentials: true
                }
            )

            dispatch(setSearchdata(result.data))

        } catch (error) {
            console.log("Search error:", error)
        }
    }

    // Debounced Search
    useEffect(() => {
        const value = inputSearch.trim()

        if (!search || !value) {
            dispatch(setSearchdata([]))
            return
        }

        const timer = setTimeout(() => {
            handleSearch(value)
        }, 400)

        return () => clearTimeout(timer)

    }, [inputSearch, search])

    // Select User
    const handleSelectUser = (user) => {
        dispatch(setselectedUser(user))
        setSearch(false)
        setInputSearch("")
        dispatch(setSearchdata([]))
    }

    // Online Status
    const isOnline = (userId) => {
        return onlineUsers?.includes(String(userId))
    }

    return (

        <div className={`
            md:w-[30%] w-full
            ${selectedUser ? "hidden md:flex" : "flex"}
            flex-col bg-blue-50 h-screen overflow-hidden
            border-r border-blue-100
        `}>

            {/* Header */}
            <div className="
                min-h-[220px]
                bg-gradient-to-br bg-blue-400 to-black
                rounded-b-[35px]
                p-5 shadow-lg
            ">

                {/* Profile Section */}
                <div className="flex justify-between items-center mb-6">

                    <div>
                        <h1 className="text-white text-2xl font-bold tracking-wide">
                            Withchat
                        </h1>

                        <p className="text-blue-100 text-sm mt-2 font-medium">
                            😊 Welcome, {userData?.name || "User"}!
                        </p>
                    </div>

                    <div
                        onClick={() => navigate("/profile")}
                        className="
                            w-[65px] h-[65px]
                            rounded-full overflow-hidden
                            border-2 border-white
                            shadow-lg cursor-pointer
                            hover:scale-105 transition
                        "
                    >
                        <img
                            src={userData?.image || dp}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                </div>

                {/* Search and Online Users */}
                <div className="w-full flex flex-col gap-3">

                    <div className="flex items-center gap-3">

                        {!search ? (

                            <button
                                onClick={() => setSearch(true)}
                                className="
                                    w-12 h-12 shrink-0
                                    rounded-full bg-white
                                    text-blue-600
                                    flex items-center justify-center
                                    shadow-md hover:bg-blue-50
                                    transition
                                "
                            >
                                <CiSearch size={27} />
                            </button>

                        ) : (

                            <div className="
                                w-full h-12
                                flex items-center gap-2
                                bg-white rounded-full
                                px-4 shadow-md
                            ">

                                <CiSearch
                                    size={23}
                                    className="text-blue-500 shrink-0"
                                />

                                <input
                                    type="text"
                                    placeholder="Search people..."
                                    className="
                                        w-full outline-none
                                        text-gray-700
                                        bg-transparent
                                    "
                                    onChange={(e) => setInputSearch(e.target.value)}
                                    value={inputSearch}
                                    autoFocus
                                />

                                <FaArrowLeft
                                    size={19}
                                    className="
                                        text-gray-500
                                        cursor-pointer
                                        hover:text-blue-600
                                        shrink-0
                                    "
                                    onClick={() => {
                                        setSearch(false)
                                        setInputSearch("")
                                        dispatch(setSearchdata([]))
                                    }}
                                />

                            </div>

                        )}

                        {/* Online Users */}
                        {!search && OtherUsersData
                            ?.filter(user => isOnline(user._id))
                            .map(user => (

                                <div
                                    key={user._id}
                                    onClick={() => handleSelectUser(user)}
                                    className="
                                        relative w-12 h-12
                                        shrink-0 cursor-pointer
                                        hover:scale-105 transition
                                    "
                                >

                                    <img
                                        src={user.image || dp}
                                        alt=""
                                        className="
                                            w-full h-full
                                            rounded-full object-cover
                                            border-2 border-white
                                            shadow-md
                                        "
                                    />

                                    <span className="
                                        absolute bottom-0 right-0
                                        w-3.5 h-3.5 rounded-full
                                        bg-green-400
                                        border-2 border-white
                                    " />

                                </div>

                            ))}

                    </div>

                    {/* Search Results */}
                    {search && inputSearch.trim() && (

                        <div className="
                            w-full max-h-[280px]
                            overflow-y-auto
                            rounded-2xl bg-white
                            shadow-xl p-2
                            flex flex-col gap-2
                        ">

                            {searchdata?.length > 0 ? (

                                searchdata.map(user => (

                                    <div
                                        key={user._id}
                                        onClick={() => handleSelectUser(user)}
                                        className="
                                            flex items-center gap-3
                                            p-3 rounded-xl
                                            cursor-pointer
                                            hover:bg-blue-50
                                            transition-all
                                            border border-transparent
                                            hover:border-blue-100
                                        "
                                    >

                                        {/* User Image */}
                                        <div className="relative w-12 h-12 shrink-0">

                                            <img
                                                src={user.image || dp}
                                                alt=""
                                                className="
                                                    w-full h-full
                                                    rounded-full object-cover
                                                "
                                            />

                                            {isOnline(user._id) && (
                                                <span className="
                                                    absolute bottom-0 right-0
                                                    w-3.5 h-3.5
                                                    rounded-full
                                                    bg-green-500
                                                    border-2 border-white
                                                " />
                                            )}

                                        </div>

                                        {/* User Details */}
                                        <div className="flex flex-col min-w-0">

                                            <h3 className="
                                                font-semibold
                                                text-gray-800 truncate
                                            ">
                                                {user.name || user.username}
                                            </h3>

                                            <p className="
                                                text-xs text-gray-500 truncate
                                            ">
                                                @{user.username}
                                            </p>

                                            <span className="
                                                text-xs text-blue-500
                                            ">
                                                {isOnline(user._id) ? "Online" : "Offline"}
                                            </span>

                                        </div>

                                    </div>

                                ))

                            ) : (

                                <p className="
                                    text-center text-gray-500
                                    py-5 text-sm
                                ">
                                    No users found
                                </p>

                            )}

                        </div>

                    )}

                </div>

            </div>

            {/* Contacts Heading */}
            <div className="px-5 pt-5 pb-2 flex justify-between items-center">

                <h2 className="text-gray-700 font-bold text-lg">
                    Messages
                </h2>

                <span className="text-xs text-blue-500 font-medium">
                    {OtherUsersData?.length || 0} Contacts
                </span>

            </div>

            {/* All Users */}
            <div className="
                w-full flex-1
                p-3 pt-1
                flex flex-col gap-2
                overflow-y-auto
            ">

                {OtherUsersData?.length > 0 ? (

                    OtherUsersData.map(user => (

                        <div
                            key={user._id}
                            onClick={() => handleSelectUser(user)}
                            className={`
                                flex items-center gap-3
                                p-3 rounded-2xl
                                cursor-pointer
                                transition-all duration-200
                                border
                                ${selectedUser?._id === user._id
                                    ? "bg-blue-200 border-blue-400 shadow-md"
                                    : "bg-white border-blue-100 hover:bg-blue-50 hover:shadow-md"
                                }
                            `}
                        >

                            {/* User Image */}
                            <div className="relative w-12 h-12 shrink-0">

                                <img
                                    src={user.image || dp}
                                    alt=""
                                    className="
                                        w-full h-full
                                        rounded-full object-cover
                                    "
                                />

                                {isOnline(user._id) && (

                                    <span className="
                                        absolute bottom-0 right-0
                                        w-3.5 h-3.5
                                        rounded-full
                                        bg-green-500
                                        border-2 border-white
                                    " />

                                )}

                            </div>

                            {/* User Name */}
                            <div className="flex flex-col min-w-0">

                                <h3 className="
                                    font-semibold
                                    text-gray-800 truncate
                                ">
                                    {user.name || user.username}
                                </h3>

                                <p className="text-xs text-gray-500">
                                    {isOnline(user._id) ? "Online" : "Offline"}
                                </p>

                            </div>

                        </div>

                    ))

                ) : (

                    <p className="
                        text-center text-gray-400
                        text-sm mt-5
                    ">
                        No contacts available
                    </p>

                )}

            </div>

            {/* Logout Button */}
            <button
                onClick={handlelogout}
                className="
                    fixed bottom-5 left-5
                    w-12 h-12 rounded-full
                    flex justify-center items-center
                    bg-blue-600 text-white
                    shadow-lg
                    hover:bg-blue-700
                    hover:scale-105
                    transition-all
                    z-50
                "
                title="Logout"
            >
                <IoMdLogOut size={25} />
            </button>

        </div>

    )
}

export default Sidebar
