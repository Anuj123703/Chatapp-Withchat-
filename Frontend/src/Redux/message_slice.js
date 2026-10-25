import { createSlice } from "@reduxjs/toolkit"

const messageSlice = createSlice(
    {
        name: "message",
        initialState: {
            // Define initial state for the user slice
            messages: [],
  
        },
        reducers: {
            // Define reducers for the user slice
            setMessage: (state, action) => {
                state.messages = action.payload
            },
        }
    }
)
export const { setMessage } = messageSlice.actions
export default messageSlice.reducer
