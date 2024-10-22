import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

export interface IProps {
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    handlePassword: (param:any)=>void

}