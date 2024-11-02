import { Button } from "@/components/button";
import { GoDotFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux"
import { clearAuthState } from "@/services/redux/reducers/auth-slice"
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProfileImage } from "@/components/profile-image";


export const HomePage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let authState = useSelector((state: any) => state.auth.value);


    useEffect(() => {
        if (!authState.token || Object.keys(authState.currentUser).length <= 0) {
            setIsAuthenticated(false);
        } else {
            if (authState.currentUser.email_verified !== true) {
                navigate("/auth/reset-password/email")
            }
        }
    }, [authState])

    const handleLogout = () => {
        dispatch(clearAuthState())
    }


    return isAuthenticated ? (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="flex flex-col items-center">
                <ProfileImage />
                
                <div className="text-lg font-semibold">{authState.currentUser.fullname}</div>
                <div className="text-sm mb-2">{authState.currentUser.email}</div>

                <div className="text-xs mb-3 flex items-center gap-2">
                    <p>{authState.currentUser.address}</p>
                    <p><GoDotFill /></p>
                    <p>{authState.currentUser.country}</p>
                    <p><GoDotFill /></p>
                    <p>{authState.currentUser.mobile}</p>
                </div>


                <Button content="Logout" handler={handleLogout} />

            </div>
        </div>
    ) : (<Navigate to={"/auth/login"} />)
}