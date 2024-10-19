import { SideNav } from "@/components/side-nav";
import { AuthLayout, RegisterLayout } from "@/layouts";
import { RegisterStepOne } from "@/pages/auth/register/step-one";
import { RouteObject } from "react-router-dom";

export const AuthRoutes:RouteObject[] = [{
    path:"auth",
    element: <AuthLayout />,
    children:[
        {
            path:'register',
            element: <RegisterLayout sideNav={<SideNav />}/>,
            children:[
                {
                    path:"",
                    element: <RegisterStepOne />
                }
            ]
        }
    ]
}]