import { createBrowserRouter } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
import AppLayout from "./components/AppLayout";
import Pictures from "./components/Pictures";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        children:[
            // {path:'login', element: <LoginPage/>}
            {path: 'pictures', element: <Pictures/>}
        ]
    }
])
export default router