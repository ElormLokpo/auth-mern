import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { IInitialState } from "./types"

const initialState:IInitialState = {
    value:{
        token: "", 
        currentUser:{}
    }
}

export const AuthSlice =  createSlice({
    name:"AuthSlice",
    initialState, 
    reducers:{
        storeAuthState : (state, action:PayloadAction<any>)=>{
            state.value = action.payload
        },
        clearAuthState: (state)=>{
            state.value = {
                token:"",
                currentUser:{}
            }
        }
    },
    
})

export  const {storeAuthState, clearAuthState} = AuthSlice.actions;
export default AuthSlice.reducer;



