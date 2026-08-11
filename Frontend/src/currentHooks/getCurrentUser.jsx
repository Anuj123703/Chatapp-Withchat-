import { useEffect } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { API_URL } from "../main.jsx"
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
                console.error("Error fetching current user:", error)
            }
        }

        fetchCurrentUser()
    }, [dispatch])
}

export default useGetCurrentUser