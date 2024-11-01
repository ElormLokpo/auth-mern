import { useState, useEffect, useRef, useContext } from "react"
import { useRequestOtpMutation, useValidateOtpMutation } from "@/services/api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"
import { routes } from "@/constants";
import { Timer } from "./timer"
import { AuthNavigationContext } from "@/context";
import { IAuthNavigationContext } from "@/context/types";

export const OtpInput = ({ email }: { email: string }) => {
    let [otp, setOtp] = useState<string[]>(new Array(6).fill(""))
    let inputRefs = useRef<(HTMLInputElement | null)[]>([])
    let [validateOtp, { isLoading }] = useValidateOtpMutation()
    let [requestOtp, { }] = useRequestOtpMutation();
    let [isError, setIsError] = useState<boolean>(false)
    let [restartTimer, setRestartTimer] = useState<boolean>(false)
    const authNavigationContextData = useContext(AuthNavigationContext) as IAuthNavigationContext


    let input_style: string;
    let generic_style = "w-full h-[4rem] flex items-center justify-center text-center border rounded text-lg py-2 px-1 mb-1"
    let def_style = `${generic_style} focus:outline-indigo-500 `
    let error_style = `${generic_style} border-red-300 focus:outline-red-400`

    input_style = isError ? error_style : def_style

    const navigate = useNavigate();

    useEffect(() => {
        if (otp[otp.length - 1]) {

            const handleResponse = async () => {
                try {
                    let { data } = await validateOtp({ email, otp: parseInt(otp.join("")) });


                    if (data?.success == true) {
                        toast("Account verified successfully")
                        setIsError(false);

                        if (authNavigationContextData?.isResetPassword == true) {
                            navigate(routes.auth.otp_password);
                        } else {
                            navigate(routes.home)
                        }
                        authNavigationContextData?.setOtpPageBlock(true);
                    } else {
                        setIsError(true)
                    }
                } catch (error) {
                    console.error("Error during OTP validation:", error);
                }
            };


            handleResponse();
        }
    }, [otp])


    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === "Backspace") {
            event.preventDefault();

            if (otp[index]) {
                let newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            } else {
                inputRefs.current[index - 1]?.focus();
            }
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let newOtp = [...otp];
        newOtp[index] = event.target.value;
        setOtp(newOtp);

        if (index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    const hanldeResendOtp = async () => {
        let { data } = await requestOtp({ email })


        if (data?.success == true) {

            toast.success("Otp sent. Kindly check your email.")
            setIsError(false);
            setOtp(new Array(6).fill(""))
            setRestartTimer(true)

        } else {
            toast.error("Something went wrong please try again.")
        }

    }

    return (
        <div>
            <div className="grid grid-cols-6 gap-2 mb-2">
                {
                    otp.map((_, index) => <input
                        key={index}
                        value={otp[index]}
                        maxLength={1}
                        type="text"
                        ref={(inputRef) => inputRefs.current[index] = inputRef}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                        onChange={(event) => handleChange(event, index)}

                        className={input_style} />)
                }


            </div>
            <div className="flex items-center justify-center">
                <p className="text-xs text-red-500">{isError && "Invalid Otp"}</p>
            </div>

            <div>
                <Timer handleResendOtp={hanldeResendOtp} restartTimer={restartTimer} />
            </div>

        </div>
    )
}
