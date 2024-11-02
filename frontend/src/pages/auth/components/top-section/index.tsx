import { FaShieldAlt } from "react-icons/fa";

export const AuthTopSection = ({head_text, sub_text}:{head_text:string, sub_text:string}) => {
    return (
        <div className="text-center flex items-center flex-col">
            <FaShieldAlt />
            <p className="text-xl font-semibold">{head_text}</p>
            <p className="text-sm">{sub_text}</p>
        </div>
    )
}