import {configureStore} from "@reduxjs/toolkit"
import { rootReducer } from "./reducers"
import { PingApi } from "../api/ping"
import { AuthApi } from "../api/auth"


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(PingApi.middleware, AuthApi.middleware)
})