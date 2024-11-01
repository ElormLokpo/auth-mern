import { Button } from "@/components/button";
import { AuthTopSection } from "../components/top-section"
import { MiscInput } from "@/components/input"
import { useState, useContext, useEffect } from "react";
import { NewPassword } from "../components/new-password";
import { useForm } from "react-hook-form";
import { useRequestOtpMutation, useResetPasswordMutation } from "@/services/api/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { routes } from "@/constants";
import { useDispatch, useSelector } from "react-redux"
import { storeAuthState } from "@/services/redux/reducers/auth-slice";
import { AuthNavigationContext } from "@/context";
import { IAuthNavigationContext } from "@/context/types";

export const ResetPasswordEmailPage = () => {
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
    const [requestOtp, { isLoading }] = useRequestOtpMutation()
    const authNavigationContextData = useContext(AuthNavigationContext) as IAuthNavigationContext

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let emailFromInput = event.target.value;
        setEmail(emailFromInput);

        if (emailFromInput.length < 1) {
            setDisableSubmit(true)
        } else {
            setDisableSubmit(false)
        }

        if (email_regex.test(emailFromInput) == false && emailFromInput.length > 0) {
            setIsError(true)
            setErrorMessage("Kindly enter a valid email")
        } else {
            setIsError(false);
            setErrorMessage("")
        }
    }

    const handleSubmit = async () => {
        if (!email) {
            setIsError(true);
            setErrorMessage("Email field is required");
        } else {
            let { data } = await requestOtp({ email })

            if (data?.success == true) {
                toast.success("Otp sent, kindly check your email.")
                dispatch(storeAuthState({ currentUser: { email } }))

                authNavigationContextData.setIsResetPassword(true)
                authNavigationContextData.setOtpPageBlock(false)
                navigate(routes.auth.otp);
            } else {

                setIsError(true);
                setErrorMessage(data?.message)
            }

        }

    }
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex justify-center w-[20rem] flex-col">
                <div className="mb-5">
                    <AuthTopSection
                        head_text="Reset Password"
                        sub_text="Kindly provide your email for otp code."
                    />
                </div>

                <div className="mb-3">
                    <MiscInput onChange={handleChange} errorMessage={errorMessage as string} isError={isError} placeholder="Kindly enter your email" name="email" type="email" />
                </div>

                <div>
                    <Button isDisabled={isError || disableSubmit} handler={handleSubmit} isLoading={isLoading} loadingText="Sending otp..." content="Next" />
                </div>
            </div>
        </div >

    )
}

export const ResetPasswordNewPasswordPage = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const authNavigationContextData = useContext(AuthNavigationContext) as IAuthNavigationContext
    const [resetPassword, {isLoading}] = useResetPasswordMutation()

    const navigate = useNavigate();
    let authState = useSelector((state:any)=>state.auth.value)

    useEffect(() => {
        if (authNavigationContextData.isResetPassword == false) {
            navigate(routes.auth.login)

        }

    }, [authNavigationContextData])

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    }

    const handleFromSubmit =  async (data: any) => {
        data.email = authState.currentUser.email
        let response = await resetPassword(data);

        if(response.data?.success == true){
            toast.success("Password changed successfully")
            navigate(routes.auth.login)
        }else{
            toast.error("Something went wrong")
        }
    }


    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex justify-center w-[22rem] flex-col">
                <div className="mb-5">
                    <AuthTopSection
                        head_text="Reset Password"
                        sub_text="Kindly provide your email for otp code."
                    />
                </div>

                <form onSubmit={handleSubmit(handleFromSubmit)}>
                    <div className="mb-3">
                        <NewPassword showLabel={false} placeholder="Kindly enter new password" register={register} errors={errors} handlePassword={handlePasswordChange} />

                    </div>

                    <div>
                        <Button isLoading={isLoading} loadingText="Changing password..." handler={() => { }} content="Reset Password" />
                    </div>
                </form>
            </div>
        </div >

    )
}