import { IProps } from "./types";


export const Button = ({ content, handler, icon, type, style_type }: IProps) => {
    let btn_style;
    let generic_style = "w-full rounded flex items-center justify-center gap-2 font-semibold py-2.5 transition-all text-sm"
    const def_style = `${generic_style} bg-indigo-500 text-white hover:bg-indigo-600 hover:py-2 `;
    const misc_style = `${generic_style} border hover:bg-stone-50`
    btn_style = style_type == "misc" ? misc_style : def_style;
    return <button type={type} className={btn_style} onClick={handler}>{icon}{content}</button>
}