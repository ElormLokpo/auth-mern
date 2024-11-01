import { useState, useEffect } from "react"

export const Timer = ({ handleResendOtp, restartTimer }: { handleResendOtp: () => void, restartTimer: boolean }) => {
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
        } else {
            setTimer(0);
        }
    }, [timer])

    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    return (
        <div className="flex items-center justify-center">
            {timer !== 0 || restartTimer == true ? <p className="text-sm"> Otp would be invalid in <span className="font-semibold">{minutes}:{seconds} minutes.</span></p>
                : <button className="text-sm underline" onClick={handleResendOtp}>resend otp</button>}
        </div>
    )
}