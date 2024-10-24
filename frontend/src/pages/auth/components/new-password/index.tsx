import { Input } from "@/components/input"
import { IProps } from "./types";
import { useEffect, useState } from "react";

export const NewPassword = ({ register, errors, handlePassword, isLoading }: IProps) => {
    const [password, setPassword] = useState<string>("")

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
        handlePassword(event.target.value)
    }

    return (
        <div>
            <div className="mb-1">
                <Input isLoading={isLoading} label="Passoword(*)" onChange={handlePasswordChange} name="password" type="password" register={register} errors={errors} />

                <PasswordStrength password={password} />
            </div>
        </div>
    )
}

const PasswordStrength = ({ password }: { password: string }) => {
    const [barBgColor, setBarBgColor] = useState("bg-blue-600")
    const [textColor, setTextColor] = useState("text-blue-600")
    const [strength_description, setStrengthDescription] = useState("")
    const [width, setWidth] = useState<string>("0%")


    useEffect(() => {


        const grade = PasswordGradeChecker(password)
        setWidth(grade.toString() + "%");

        if (grade <= 20) {

            setBarBgColor("bg-red-600");
            setTextColor("text-red-600");
            setStrengthDescription("Too weak")
        } else if (grade > 20 && grade < 40) {
            setBarBgColor("bg-orange-600");
            setTextColor("text-orange-600");
            setStrengthDescription("Weak")
        } else if (grade > 40 && grade <= 50) {
            setBarBgColor("bg-orange-600");
            setTextColor("text-orange-600");
            setStrengthDescription("Average")
        } else if (grade > 50 && grade <= 70) {
            setBarBgColor("bg-lime-500");
            setTextColor("text-lime-500");
            setStrengthDescription("Good")
        } else if (grade > 70) {
            setBarBgColor("bg-green-600");
            setTextColor("text-green-600");
            setStrengthDescription("Strong")
        }
    }, [password])



    return (
        <>
            {parseInt(width) > 0 && <div className="grid grid-cols-12 items-center gap-3">

                <div className="w-full col-span-10 bg-gray-200 rounded-full h-2">
                    <div style={{ width: `${width}`, transition: "width 0.5s ease-in-out" }} className={`${barBgColor} h-2 rounded-full`}></div>
                </div>
                <p className={`text-[0.7rem] ${textColor} font-semibold col-span-2`}>{strength_description}</p>
            </div>}
        </>
    )
}

const PasswordGradeChecker = (password: string) => {
    let grade = 0;
    let containsUppercase = /[A-Z]/.test(password);
    let containsNumber = /\d/.test(password);
    let containsSymbol = /[@!#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length >= 8 && containsNumber && containsUppercase && containsSymbol) {
        grade = 100;


    } else if (password.length >= 6 && containsNumber || containsSymbol) {
        grade = 80;


    } else if (password.length >= 6 && containsUppercase && containsSymbol) {
        grade = 80;


    } else if (password.length >= 6 && containsNumber && containsUppercase) {
        grade = 65;


    } else if (password.length >= 4 && containsNumber) {
        grade = 50;


    } else if (password.length >= 1 && password.length < 6) {
        grade = 10;

    } else if (password.length >= 6 && (!containsSymbol || !containsNumber || !containsUppercase)) {
        grade = 35;
    } else {
        grade = 0;
    }


    return grade
}