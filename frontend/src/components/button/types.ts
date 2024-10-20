import { ReactElement } from "react";

export interface IProps {
    handler: () => void,
    content: string,
    icon?: ReactElement,
    type?: "submit" | "reset" | "button" | undefined,
    style_type?: string
}