import {createBrowserRouter, RouteObject} from "react-router-dom";
import { AuthRoutes } from "./auth_routes";
import { RootLayout } from "@/layouts";


const RootRoute:RouteObject[] = [{
    path:"",
    element: <RootLayout />,
    children: [...AuthRoutes]
}]

export const router = createBrowserRouter([...RootRoute])