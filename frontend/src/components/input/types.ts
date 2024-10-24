import { UseFormRegister, Control, FieldValues, FieldErrors } from "react-hook-form";

export interface IProps {
    label?: string,
    placeholder?: string,
    type?: string,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    name: string,
    isError? : boolean,
    isLoading?:boolean,
    onChange?: (param: any) => void

}

export interface IPhoneProps {
    control: Control<FieldValues, any>,
    errors: FieldErrors<FieldValues>,
    name: string,
    label: string,
    handlePhoneNumberChange: (param: any) => void,
    isLoading?:boolean
}

export interface ICountryProps {
    label?: string,
    handleCountryChange: (param: any) => void, 
    isLoading?:boolean
}

export interface IConfirmPasswordProps {
    label: string,
    onChange: (param: any) => void,
    errorMatch:boolean,
    isLoading?:boolean
}