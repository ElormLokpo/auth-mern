import { useForm } from "react-hook-form";
import { Input, PhoneInput, CountrySelector, ConfirmPassword } from "@/components/input";
import { Button } from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/schema/auth";
import { useState, useContext } from "react";
import { NewPassword } from "../components/new-password";
import { Link } from "react-router-dom";
import { GoogleComponent } from "../components/google-comp";
import { AuthTopSection } from "../components/top-section";
import { useRegisterMutation } from "@/services/api/auth";
import { toast } from "sonner"
import {useNavigate} from "react-router-dom"
import { routes } from "@/constants";
import { AuthNavigationContext } from "@/context";
import { IAuthNavigationContext } from "@/context/types";

export const Register = () => {
    const [phone, setPhoneNumber] = useState<string>()
    const [country, setCountry] = useState<any>()
    const [temPassword, setTempPassword] = useState<string>()
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false)
    const [registerApiMutation, { isLoading }] = useRegisterMutation();
    const authNavigationContextData = useContext(AuthNavigationContext) as IAuthNavigationContext

    let navigate = useNavigate();

    const { register, control, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(registerSchema)
    })

    const handlePhoneNumberChange = (phoneNumber: string) => {
        setPhoneNumber(phoneNumber)
    }

    const handleCountryChange = (country: any) => {
        setCountry(country)
    }
    const handleFormSubmit = async (data: any) => {
        data.mobile = phone;
        data.country = country?.label;

        let response = await registerApiMutation(data)
        
        let { message, success } = response.data as any;

        if (success == true) {
            toast.success(`${message}`);
            
            authNavigationContextData.setOtpPageBlock(false)
            authNavigationContextData.setIsResetPassword(false)
            navigate(routes.auth.otp)
        }

        if (success == false) {
            toast.error(`${message}`)
        }

    }

    const handlePasswordChange = (password: string) => {
        setTempPassword(password)
    }

    const handleConfirmPassword = (event: any) => {

        if (temPassword !== event.target.value) {
            setConfirmPasswordError(true);
        } else {
            setConfirmPasswordError(false)
        }
    }


    return (


        <div className="h-full p-6 flex justify-center">
            <div className="flex w-[24rem] justify-center flex-col ">
                <div className="mb-8">
                    <AuthTopSection
                        head_text="Create free account"
                        sub_text="Kindly provide basic information. Fields with (*) are required"
                    />
                </div>
                <div>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="grid grid-cols-2 gap-2 mb-1">
                            <Input label="First name(*)" name="firstname" register={register} errors={errors} />
                            <Input label="Last name(*)" name="lastname" register={register} errors={errors} />
                        </div>
                        <div className="mb-1">
                            <Input label="Other names" name="othernames" register={register} errors={errors} />
                        </div>
                        <div className="mb-1">
                            <PhoneInput handlePhoneNumberChange={handlePhoneNumberChange} control={control} label="Phone Number" name="mobile" errors={errors} />
                        </div>

                        <div className="mb-1">
                            <CountrySelector handleCountryChange={handleCountryChange} label="Country" />

                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {/* <Input label="Nationality" name="nationality" register={register} errors={errors} />
                         */}
                            <Input label="Address" name="address" register={register} errors={errors} />
                            <Input label="Zip Code" name="zip_code" register={register} errors={errors} />

                        </div>

                        <div className="border mb-2 border-stone-100">

                        </div>

                        <div className="mb-1">
                            <Input label="Email(*)" placeholder="someone@something.com" name="email" type="email" register={register} errors={errors} />
                        </div>

                        <NewPassword handlePassword={handlePasswordChange} register={register} errors={errors} />

                        <div className="mb-4">
                            <ConfirmPassword errorMatch={confirmPasswordError} label="Confirm Password" onChange={handleConfirmPassword} />
                        </div>

                        <div className="mb-1">
                            <Button isLoading={isLoading} loadingText="Creating account..." content="Next" handler={() => { }} />
                        </div>

                        <div className="flex items-center justify-center">
                            <Link to={routes.auth.login} className="mb-6 text-[0.8rem] underline">Already have an account? <span className="font-semibold">Login</span></Link>
                        </div>


                    </form>
                </div>
                <GoogleComponent />
            </div>
        </div>

    )
}