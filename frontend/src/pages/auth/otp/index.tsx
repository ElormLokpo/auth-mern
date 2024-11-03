import { AuthTopSection } from "../components/top-section"
import { useSelector } from "react-redux"
import { OtpInput } from "./components/otp-input";
import { useContext, useEffect } from "react";
import { AuthNavigationContext } from "@/context";
import { useNavigate } from "react-router-dom";
import { routes } from "@/constants";
import { IAuthNavigationContext } from "@/context/types";

export const OtpPage = () => {
    const authNavigationContextData = useContext(AuthNavigationContext) as IAuthNavigationContext

    const navigate = useNavigate();

    useEffect(()=>{
        if(authNavigationContextData.otpPageBlock == true){
            navigate(routes.auth.login)
        }
       
    },[authNavigationContextData])
    
    let { currentUser } = useSelector((state: any) => state.auth.value);
 
    return (
        <div className="h-screen flex  items-center justify-center">
            <div className="flex justify-center w-[20rem] flex-col">
                <div className="mb-3">
                    <AuthTopSection
                        head_text="Verify account"
                        sub_text="Kindly enter otp sent to your email."
                    />
                </div>

                <div>
                    <div className="mb-1">
                        <OtpInput email={currentUser.email} />

                    </div>


                </div>
            </div>
        </div>
    )
}



