import { ReactElement } from "react"
import { Outlet } from "react-router-dom"

export const AuthLayout = ()=>{
    return(
        <div className="h-screen w-screen">
            <Outlet />
        </div>
    )
}

export const RegisterLayout = ({sideNav}:{sideNav:ReactElement})=>{
    return(
        <div className="h-screen grid grid-cols-12 p-3">
            <div className="col-span-3">
                {sideNav}
            </div>
            <div className="col-span-9">
                <Outlet />
            </div>
        </div>
    )
}