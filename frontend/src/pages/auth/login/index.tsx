import { useForm } from "react-hook-form";
import { Input, } from "@/components/input";
import { Button } from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/schema/auth";
import { Link, useNavigate } from "react-router-dom";
import { GoogleComponent } from "../components/google-comp";
import { AuthTopSection } from "../components/top-section";
import { toast } from "sonner"
import { useLoginMutation } from "@/services/api/auth";
import { useState } from "react";
import { routes } from "@/constants"

export const Login = () => {
    const [loginApiMutation, { isLoading }] = useLoginMutation();
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("")

    const { register, control, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const navigate = useNavigate();

    const handleFormSubmit = async (data: any) => {
        let response = await loginApiMutation(data)

        let { message, success } = response.data as any;

        if (success == true) {
            toast.success(`${message}`);
            navigate(routes.home)
        }

        if (success == false) {
            setIsError(true);
            toast.error(`${message}`)
            setErrorMessage(message);
        }
    }


    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex justify-center w-[20rem] flex-col">
                <div className="mb-8">
                    <AuthTopSection
                        head_text="Log into your account"
                        sub_text="Kindly login with your email and password."
                    />
                </div>

                <div>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>


                        <div className="mb-1">
                            <Input isLoading={isLoading} isError={isError} label="Email" placeholder="someone@something.com" name="email" type="email" register={register} errors={errors} />
                        </div>

                        <div className="mb-1">
                            <Input isLoading={isLoading} isError={isError} label="Password" placeholder="Password" name="password" type="password" register={register} errors={errors} />
                        </div>
                        {isError && <p className="text-[0.7rem] mb-1 text-red-500 font-semibold">{errorMessage}</p>}

                        <Link to={routes.auth.otp_email} className="mb-6 text-[0.7rem] underline">Forgot Password?</Link>

                        <div className="mb-1">
                            <Button isLoading={isLoading} loadingText="Logging you in..." content="Login" handler={() => { }} />
                        </div>

                        <div className="flex items-center justify-center">
                            <Link to={routes.auth.register} className="mb-6 text-[0.8rem] underline">Don't have an account? <span className="font-semibold">Create One</span></Link>
                        </div>


                    </form>
                </div>
                <GoogleComponent />
            </div>
        </div>
    )
}