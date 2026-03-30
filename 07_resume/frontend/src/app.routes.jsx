import {createBrowserRouter, Navigate} from "react-router"
import login from "./featuers/auth/pages/login.jsx"
import register from "./featuers/auth/pages/register.jsx"








export const router = createBrowserRouter([
    {
        path:"/login",
        element:<login />
    },
    {
        path:"/register",
        element:<register />
    }
])