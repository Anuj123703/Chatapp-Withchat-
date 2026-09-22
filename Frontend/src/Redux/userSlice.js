import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice(
    {
          name: "user",
          initialState: {
            // Define initial state for the user slice
            userData: null,
            OtherUsersData : null,
            selectedUser : null
          },
          reducers: {
            // Define reducers for the user slice
            setUserData: (state, action) => {
                state.userData = action.payload
            },
           setOtherUsersData : (state, action) => {
             state.OtherUsersData = action.payload
            },
            setselectedUser: (state, action) => {
              state.selectedUser = action.payload
            },
          }
    }
)
export const { setOtherUsersData ,setUserData, setselectedUser} = userSlice.actions
export default userSlice.reducer
