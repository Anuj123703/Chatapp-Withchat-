import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { API_URL } from "../config.js"
import { setOtherUsersData, setUserData } from "../Redux/userSlice.js"

const getOtherUsers = () => {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user?.userData);

    useEffect(() => {

        if (!userData) return;

        const fetchCurrentUser = async () => {
            try {
                const result = await axios.get(
                    `${API_URL}/api/user/others`,
                    { withCredentials: true }
                )
                dispatch(setOtherUsersData(result.data))
            } catch (error) {
                console.log("STATUS:", error.response?.status)
                console.log("MESSAGE:", error.response?.data)
            }
        }

        fetchCurrentUser()
    }, [userData, dispatch])
}

export default getOtherUsers