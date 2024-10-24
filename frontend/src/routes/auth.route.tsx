import { Login } from "@/pages/auth/login";
import { Register } from "@/pages/auth/register";
import { RouteObject } from "react-router-dom";

export const AuthRoutes: RouteObject[] = [
    {
        path: "auth/register",
        element: <Register />

    }, {
        path:"auth/login",
        element: <Login />
    }
]