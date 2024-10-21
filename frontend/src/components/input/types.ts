import { UseFormRegister, Control, FieldValues, FieldErrors } from "react-hook-form";

export interface IProps {
    label?: string,
    placeholder?: string,
    type?: string,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    name: string,
    onChange?:(param:any)=>void

}

export interface IPhoneProps {
    control: Control<FieldValues, any>,
    errors: FieldErrors<FieldValues>,
    name: string,
    label: string,
    handlePhoneNumberChange: (param: any) => void
}

export interface ICountryProps {
    label?: string,
    handleCountryChange: (param: any) => void
}