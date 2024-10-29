import { useState, useRef, useEffect } from "react"
import { AuthTopSection } from "../components/top-section"
import { useSelector } from "react-redux"
import { current } from "@reduxjs/toolkit";
import { useRequestOtpMutation, useValidateOtpMutation } from "@/services/api/auth";
import { toast } from "sonner";

export const OtpPage = () => {

    let { currentUser } = useSelector((state: any) => state.auth.value);
    console.log("USER", currentUser);



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


export const OtpInput = ({ email }: { email: string }) => {
    let [otp, setOtp] = useState<string[]>(new Array(6).fill(""))
    let inputRefs = useRef<(HTMLInputElement | null)[]>([])
    let [validateOtp, { isLoading }] = useValidateOtpMutation()
    let [requestOtp, { }] = useRequestOtpMutation();
    let [isError, setIsError] = useState<boolean>(false)
    let [restartTimer, setRestartTimer] = useState<boolean>(false)


    let input_style: string;
    let generic_style = "w-full h-[4rem] flex items-center justify-center text-center border rounded text-lg py-2 px-1 mb-1"
    let def_style = `${generic_style} focus:outline-indigo-500 `
    let error_style = `${generic_style} border-red-300 focus:outline-red-400`

    input_style = isError ? error_style : def_style



    useEffect(() => {
        if (otp[otp.length - 1]) {


            const handleResponse = async () => {
                try {
                    let { data } = await validateOtp({ email, otp: parseInt(otp.join("")) });

                    console.log(data);
                    if (data?.success == true) {
                        toast("Account verified successfully")
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
        let response = await requestOtp({ email })

        setRestartTimer(true)
        console.log(response)
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

const Timer = ({ handleResendOtp, restartTimer }: { handleResendOtp: () => void, restartTimer: boolean }) => {
    const [timer, setTimer] = useState<number>(300);

    useEffect(() => {
        if (restartTimer == true) {
            setTimer(300);

        }
    }, [restartTimer])

    useEffect(() => {

        if (timer > 0) {
            let intervalId = setInterval(() => {
                setTimer((timeLeft) => timeLeft - 1)
            }, 1000);

            return () => clearInterval(intervalId)
        }else{
            setTimer(0);
        }
    }, [timer])

    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    return (
        <div className="flex items-center justify-center">
            {timer !== 0 ? <p className="text-sm"> Otp would be invalid in <span className="font-semibold">{minutes}:{seconds} minutes.</span></p>
                : <button className="text-sm underline" onClick={handleResendOtp}>resend otp</button>}
        </div>
    )
}