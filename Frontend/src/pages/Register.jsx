import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../main.jsx'
import { useDispatch } from 'react-redux'
import { setUserData } from '../Redux/userSlice.js'


function Register() {
    let navigate = useNavigate()
    let [showPassword, setShowPassword] = useState(false)

    let [username, setusername] = useState("")
    let [email, setemail] = useState("")
    let [password, setpassword] = useState("")

    let [loading, setloading] = useState(false)
    let [message, setMessage] = useState("")
    let dispatch = useDispatch()

    let handleregister = async (e) => {
        e.preventDefault()
        setloading(true)
        setMessage("")

        try {
            let user = await axios.post(
                `${API_URL}/api/auth/register`,
                {
                    username,
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            )
            dispatch(setUserData(user.data))
            console.log('User registered successfully:', user)

            setMessage("✅ Registered Successfully!")
            setusername("")
            setemail("")
            setpassword("")
            setloading(false)

            setTimeout(() => navigate('/login'), 1000)

        } catch (error) {
            setMessage(error.response?.data?.message || "❌ Registration failed")
        } finally {
            setloading(false)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <div className="bg-blue-100 m-10 rounded-3xl shadow-2xl w-96 border border-blue-400  " >
                <div className="text-xl font-bold text-center bg-blue-400 rounded-t-2xl rounded-b-3xl p-10 shadow-2xl z-10 ">Welcome to <span className="text-blue-100 p-2">Withchat</span>
                </div>
                <form
                    className="bg-blue-100 p-6 mt-9 rounded-b-3xl"
                    onSubmit={handleregister}
                >

                    <input
                        type="text"
                        placeholder="Full Name"
                        onChange={(e) => setusername(e.target.value)}
                        value={username}
                        className="w-full mb-4 p-3 border border-blue-400 rounded-lg bg-blue-100 placeholder:text-black "
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setemail(e.target.value)}
                        value={email}
                        className="w-full mb-4 p-3 border border-blue-400 rounded-lg bg-blue-100 placeholder:text-black"
                    />

                    <div className="relative">
                        <input
                            value={password}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            onChange={(e) => setpassword(e.target.value)}
                            className="w-full mb-6 p-3 border border-blue-400 rounded-lg bg-blue-100 placeholder:text-black"
                        />
                        <span
                            className="absolute right-3 top-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </span>
                    </div>

                    <button
                        className="w-full bg-blue-100 font-bold text-black hover:bg-blue-400 hover:text-white p-3 rounded-lg"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Register"}
                    </button>

                    {message && (
                        <p className={`text-center mt-3 text-sm font-medium ${message.includes("Successfully") ? "text-green-600" : "text-red-500"
                            }`}>
                            {message}
                        </p>
                    )}

                    <p className="text-sm mt-4 text-center text-black">
                        Already have an account? <span className="text-green-950 font-semibold underline-offset-5 underline cursor-pointer" onClick={() => navigate('/login')}>Login</span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register