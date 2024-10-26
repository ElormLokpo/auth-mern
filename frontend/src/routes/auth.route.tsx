import { Login } from "@/pages/auth/login";
import { OtpPage } from "@/pages/auth/otp";
import { Register } from "@/pages/auth/register";
import { ResetPasswordEmailPage, ResetPasswordNewPasswordPage } from "@/pages/auth/reset-password";
import { RouteObject } from "react-router-dom";

export const AuthRoutes: RouteObject[] = [
    {
        path: "auth/register",
        element: <Register />

    }, {
        path:"auth/login",
        element: <Login />
    },{
        path:"auth/otp",
        element:<OtpPage />
    },
    {
        path:"auth/reset-password/email",
        element: <ResetPasswordEmailPage />
    },
    {
        path:"auth/reset-password/password",
        element: <ResetPasswordNewPasswordPage />
    }
]