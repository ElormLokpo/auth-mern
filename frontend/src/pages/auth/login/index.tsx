import { useForm } from "react-hook-form";
import { Input, } from "@/components/input";
import { Button } from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/schema/auth";
import { Link } from "react-router-dom";
import { GoogleComponent } from "../components/google-comp";
import { AuthTopSection } from "../components/top-section";


export const Login = () => {

    const { register, control, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const handleFormSubmit = (data: any) => {
        console.log(data)
    }


    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex justify-center w-[20rem] flex-col">
                <AuthTopSection
                    head_text="Log into your account"
                    sub_text="Kindly login with your email and password."
                />
                <div>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>


                        <div className="mb-1">
                            <Input label="Email" placeholder="someone@something.com" name="email" type="email" register={register} errors={errors} />
                        </div>

                        <div className="mb-1">
                            <Input label="Password" placeholder="Password" name="password" type="password" register={register} errors={errors} />
                        </div>
                        <p className="mb-4 text-[0.7rem] underline">Forgot Password?</p>

                        <div className="mb-1">
                            <Button content="Login" handler={() => { }} />
                        </div>

                        <div className="flex items-center justify-center">
                            <Link to="/auth/register" className="mb-6 text-[0.8rem] underline">Don't have an account? <span className="font-semibold">Create One</span></Link>
                        </div>


                    </form>
                </div>
                <GoogleComponent />
            </div>
        </div>
    )
}