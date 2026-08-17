import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { API_URL } from "../config.js"
import { setUserData } from "../Redux/userSlice.js"


const useGetCurrentUser = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const result = await axios.get(
                    `${API_URL}/api/user/current`,
                    { withCredentials: true }
                )
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log("STATUS:", error.response?.status)
                console.log("MESSAGE:", error.response?.data)
            }
        }

        fetchCurrentUser()
    }, [dispatch])
}

export default useGetCurrentUser