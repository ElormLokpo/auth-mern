import {createBrowserRouter, RouteObject} from "react-router-dom";
import { AuthRoutes } from "./auth.route";
import { RootLayout } from "@/layouts";
import { HomeRoutes } from "./home.route";


const RootRoute:RouteObject[] = [{
    path:"",
    element: <RootLayout />,
    children: [...AuthRoutes, ...HomeRoutes]
}]

export const router = createBrowserRouter([...RootRoute])