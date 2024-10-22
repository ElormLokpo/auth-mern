import { Outlet } from "react-router-dom"

export const AuthLayout = ()=>{
    return(
        <div className="h-screen w-screen">
            <Outlet />
        </div>
    )
}

