
import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "./auth-slice"
import { PingApi } from "@/services/api/ping"
import { AuthApi } from "@/services/api/auth"

export const rootReducer = combineReducers({
    auth: authSlice,
    [PingApi.reducerPath]: PingApi.reducer,
    [AuthApi.reducerPath] : AuthApi.reducer
})