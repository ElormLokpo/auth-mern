import { ICountryProps, IPhoneProps, IProps } from "./types";
import { CgDanger } from "react-icons/cg";
import { PhoneInput as Phone } from 'react-international-phone';
import 'react-international-phone/style.css';

import { useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

let input_style;
let generic_style = "w-full border rounded text-xs py-2 px-1 mb-1"
let def_style = `${generic_style} focus:outline-indigo-500 `
let error_style = `${generic_style} border-red-300 focus:outline-red-400`

export const Input = ({ label, type, placeholder, register, errors, name }: IProps) => {


    input_style = errors[`${name}`] ? error_style : def_style;
    let error_message = errors[`${name}`]?.message;

    return (
        <div>
            <label className="text-[0.75rem] text-stone-700 font-semibold">{label}:</label>
            <input {...register(name)} className={input_style} placeholder={placeholder} type={type ? type : "text"} />
            {errors[`${name}`] && <p className="text-red-500 text-[0.65rem] flex items-center gap-1"><CgDanger /> {error_message as string}</p>}

        </div>
    )
}

export const PhoneInput = ({ label, errors, name, handlePhoneNumberChange }: IPhoneProps) => {

    let error_message = errors[`${name}`]?.message;
    const onChange = (phone: any) => {
        handlePhoneNumberChange(phone);
    }

    return (
        <div className="">
            <label className="text-[0.75rem] text-stone-700 font-semibold">{label}:</label>
            <Phone

                onChange={onChange}
                inputClassName={def_style}
                defaultCountry="gh"
            />
            {errors[`${name}`] && <p className="text-red-500 text-[0.65rem] flex items-center gap-1"><CgDanger /> {error_message as string}</p>}

        </div>
    )
}



export const CountrySelector = ({label, handleCountryChange}:ICountryProps) => {
    let options = useMemo(() => countryList().getData(), [])

    const onChange = (country: any) => {
        handleCountryChange(country);
    }

    return (
        <div>
            <label className="text-[0.75rem] text-stone-700 font-semibold">{label}:</label>

            <Select className="text-sm " options={options as any} onChange={onChange} />
        </div>)
}

export default CountrySelector
