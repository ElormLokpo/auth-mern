import { router } from "@/routes"
import { RouterProvider } from "react-router-dom"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/services/redux/store"

export const RootProvider = () => {
    return (
        <div>
            <ReduxProvider store={store}>
                <RouterProvider router={router} />
            </ReduxProvider>
        </div>
    )
}