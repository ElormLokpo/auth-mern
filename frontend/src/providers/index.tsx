import { router } from "@/routes"
import { RouterProvider } from "react-router-dom"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/services/redux/store"
import { AuthNavigationContextProvider } from "./context-providers"

export const RootProvider = () => {
    return (
        <div>
            <ReduxProvider store={store}>
                <AuthNavigationContextProvider>
                    <RouterProvider router={router} />
                </AuthNavigationContextProvider>
            </ReduxProvider>
        </div>
    )
}