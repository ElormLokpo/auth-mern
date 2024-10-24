import { IProps } from "./types";
import { ClipLoader } from "react-spinners"

export const Button = ({ content, handler, icon, type, style_type, isLoading, loadingText }: IProps) => {
    let btn_style;
    let generic_style = "w-full rounded flex items-center justify-center gap-2 font-semibold py-2.5 transition-all text-sm"
    const def_style = `${generic_style} bg-indigo-500 text-white hover:bg-indigo-600 hover:py-2 `;
    const misc_style = `${generic_style} border hover:bg-stone-50`
    const loading_style = `${generic_style} text-white cursor-not-allowed bg-indigo-300`

    if (isLoading){
        btn_style = loading_style;
    }else{
        btn_style = style_type == "misc" ? misc_style : def_style;
    }
   
    return <button
        disabled = {isLoading as boolean}
        type={type}
        className={btn_style}
        onClick={handler}>
        {isLoading && <ClipLoader size={15} color={style_type == "misc" ? "black" : "white"} />}
        {!isLoading && icon}{isLoading ? loadingText : content}
    </button>
}


