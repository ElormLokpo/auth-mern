import { AuthLayout} from "@/layouts";
import { Register } from "@/pages/auth/register";
import { RouteObject } from "react-router-dom";

export const AuthRoutes:RouteObject[] = [{
    path:"auth",
    element: <AuthLayout />,
    children:[
        {
            path:'register',
            element: <Register/>,
           
        }
    ]
}]