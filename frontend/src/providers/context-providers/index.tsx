import { AuthNavigationContext } from "@/context";
import {useState} from "react";

export const AuthNavigationContextProvider = ({children}:{children:any})=>{
    const [otpPageBlock, setOtpPageBlock] = useState(true);
    const [isResetPassword, setIsResetPassword] = useState(false);
    
    return(
        <AuthNavigationContext.Provider value={{otpPageBlock, setOtpPageBlock, isResetPassword, setIsResetPassword}} >
            {children}
        </AuthNavigationContext.Provider>
    )
}