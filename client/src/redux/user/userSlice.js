import {
    createSlice
} from '@reduxjs/toolkit'
//slice is used to define reducers and actions in a consice manner 

const initialState = {
    currentUser: null,
    error: null,
    loading: false 

}
// create slice takes an object with three properties name initial state and reducers

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true
        },
        signInSuccess:(state,action)=>{
            state.currentUser = action.payload 
            state.loading = false 
            state.error = null
        },
        signInFailure:(state,action)=>{
            state.error = action.payload;
            state.loading= false
        }
    }
})

export const {signInFailure,signInStart,signInSuccess} = userSlice.actions

export default userSlice.reducer