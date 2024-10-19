import {createBrowserRouter} from "react-router-dom";
import { AuthRoutes } from "./auth_routes";


export const router = createBrowserRouter([...AuthRoutes])