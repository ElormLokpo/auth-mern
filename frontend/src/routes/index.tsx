import { RootLayout } from "@/layouts";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { AuthRoutes } from "./auth-routes";

import { ErrorPage, PageNotFoundPage } from "@/pages/error";


const RootRoute: RouteObject[] = [
    {
        path: "",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [...AuthRoutes, ]
    },
    {
        path: "*",
        element: <PageNotFoundPage />
    }
]

export const router = createBrowserRouter(RootRoute);