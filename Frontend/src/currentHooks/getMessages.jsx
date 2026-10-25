import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { API_URL } from "../config.js"
import { setOtherUsersData, setUserData } from "../Redux/userSlice.js"
import { setMessage } from "../Redux/message_slice.js"

const getMessage = () => {
    const dispatch = useDispatch()
    const {userData, selectedUser} = useSelector((state) => state.user?.userData);

    useEffect(() => {

        if (!userData) return;

        const fetchMessage = async () => {
            try {
                const result = await axios.get(
                    `${API_URL}/api/message/get/${selectedUser._id}`,
                    { withCredentials: true }
                )
                dispatch(setMessage(result.data))
            } catch (error) {
                    console.log(error)
            }
        }


        fetchMessage()
    }, [selectedUser, userData])
}

export default getMessage