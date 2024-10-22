import { FaShieldAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Input, PhoneInput, CountrySelector, ConfirmPassword } from "@/components/input";
import { Button } from "@/components/button";
import { FcGoogle } from "react-icons/fc";
import { zodResolver } from "@hookform/resolvers/zod"
import { authSchema } from "@/schema/auth";
import { useState } from "react";
import { NewPassword } from "../components/new-password";

export const Register = () => {
    const [phone, setPhoneNumber] = useState<string>()
    const [country, setCountry] = useState<any>()
    const [temPassword, setTempPassword] = useState<string>()
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false)

    const { register, control, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(authSchema)
    })

    const handlePhoneNumberChange = (phoneNumber: string) => {
        setPhoneNumber(phoneNumber)
    }

    const handleCountryChange = (country: any) => {
        setCountry(country)
    }
    const handleFormSubmit = (data: any) => {
        data.mobile = phone;
        data.country = country?.label;

        console.log(data)

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
        <div className="flex justify-center flex-col items-center p-6">
            <div className="w-[25rem]">
                <div className="text-center flex items-center flex-col mb-8">
                    <FaShieldAlt />
                    <p className="text-xl font-semibold">Create a free account</p>
                    <p className="text-sm">Kindly provide basic information. Fields with (*) are required.</p>
                </div>

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
                        <Button content="Next" handler={() => { }} />
                    </div>

                    <div className="flex items-center justify-center">
                        <p className="mb-6 text-[0.8rem] underline">Already have an account? <span className="font-semibold">Login</span></p>
                    </div>

                    <div className="grid grid-cols-12 items-center gap-1 mb-2">
                        <hr className="col-span-5" />
                        <div className="col-span-2">
                            <p className="text-center">or</p>
                        </div>

                        <hr className="col-span-5" />
                    </div>


                    <div className="mb-6">
                        <Button icon={<FcGoogle />} style_type="misc" content="Continue with Google" handler={() => { }} />
                    </div>
                </form>
            </div>
        </div>
    )
}