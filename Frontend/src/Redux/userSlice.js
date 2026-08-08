import { createSlice } from "@reduxjs/toolkit"
const userSlice = createSlice(
    {
          name: "user",
          initialState: {
            // Define initial state for the user slice
            userData: null
          },
          reducers: {
            // Define reducers for the user slice
            setuserData: (state, action) => {
                state.userData = action.payload
            }
          }
    }
)
export const { setuserData} = userSlice.actions
export default userSlice.reducer
