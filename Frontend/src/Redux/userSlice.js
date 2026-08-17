import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice(
    {
          name: "user",
          initialState: {
            // Define initial state for the user slice
            userData: null,
            OtherUsersData : null
          },
          reducers: {
            // Define reducers for the user slice
            setUserData: (state, action) => {
                state.userData = action.payload
            },
           setOtherUsersData : (state, action) => {
             state.OtherUsersData = action.payload
            }
          }
    }
)
export const { setOtherUsersData ,setUserData} = userSlice.actions
export default userSlice.reducer
