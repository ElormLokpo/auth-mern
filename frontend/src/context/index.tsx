import { createContext } from "react";
import { IAuthNavigationContext } from "./types";


export const AuthNavigationContext = createContext<IAuthNavigationContext | undefined>(undefined);
