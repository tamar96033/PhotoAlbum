import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Pictures from "./components/Pictures";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        children:[
            {path: '', element: <HomePage/>},
            {path:'login', element: <LoginPage/>},
            {path: 'pictures', element: <Pictures/>}
        ]
    }
])
export default router