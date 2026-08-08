import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { API_URL } from "../main.jsx"
import { setuserData } from "../Redux/userSlice.js"


const getCurrentUser = async () => {
    useEffect(() => {
        let dispatch = useDispatch()
        let { setuserData } = useSelector((state) => state.user)
        const fetchCurrentUser = async () => {
            try {
                let result = await axios.get(`${API_URL}/api/auth/current`, {
                    withCredentials: true
                })
                dispatch(setuserData(result.data))
            } catch (error) {
                console.error('Error fetching current user:', error)
            }
        }
        fetchCurrentUser()
    }, { userData })
}
export default getCurrentUser
