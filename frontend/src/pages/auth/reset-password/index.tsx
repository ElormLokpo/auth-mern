import { Button } from "@/components/button";
import { AuthTopSection } from "../components/top-section"
import { MiscInput } from "@/components/input"
import { useState } from "react";
import { NewPassword } from "../components/new-password";
import { UseFormRegister, FieldValues, FieldErrors, useForm } from "react-hook-form";


export const ResetPasswordEmailPage = () => {
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>()
    const [email, setEmail] = useState<string>()


    let email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let emailFromInput = event.target.value;
        setEmail(emailFromInput);

        if (email_regex.test(emailFromInput) == false && emailFromInput.length > 0) {
            setIsError(true)
            setErrorMessage("Kindly enter a valid email")
        } else {
            setIsError(false);
            setErrorMessage("")
        }
    }

    const handleSubmit = () => {
        if (!email) {
            setIsError(true);
            setErrorMessage("Email field is required");
        }
        console.log("email", email)
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
                    <Button isDisabled={isError} handler={handleSubmit} content="Next" />
                </div>
            </div>
        </div >

    )
}

export const ResetPasswordNewPasswordPage = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    }

    const handleFromSubmit = (data: any) => {
        console.log(data);
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
                        <Button handler={() => { }} content="Reset Password" />
                    </div>
                </form>
            </div>
        </div >

    )
}