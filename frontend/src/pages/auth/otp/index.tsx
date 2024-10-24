import { useState, useRef, useEffect } from "react"
import { AuthTopSection } from "../components/top-section"
import { Button } from "@/components/button"

export const OtpPage = () => {
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
                    <OtpInput />
                </div>
            </div>
        </div>
    )
}


export const OtpInput = () => {
    let [otp, setOtp] = useState<string[]>(new Array(6).fill(""))
    let inputRefs = useRef<(HTMLInputElement | null)[]>([])

    let input_style;
    let generic_style = "w-full h-[4rem] flex items-center justify-center text-center border rounded text-lg py-2 px-1 mb-1"
    let def_style = `${generic_style} focus:outline-indigo-500 `
    let error_style = `${generic_style} border-red-300 focus:outline-red-400`

    input_style = def_style

    useEffect(()=>{

    },[otp])


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

        </div>
    )
}