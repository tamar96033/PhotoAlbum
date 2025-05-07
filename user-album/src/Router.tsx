import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Pictures from "./components/galery/Pictures";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AlbumsPage from "./pages/AlbumsPage";
import TagsPage from "./pages/TagsPage";
import NotFoundPage from "./pages/NotFoundPage";
import GaleryPage from "./pages/GaleryPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        children:[
            {path: '', element: <HomePage/>},
            {path:'login', element: <LoginPage/>},
            {path: 'pictures', element: <GaleryPage/>},
            {path: 'albums', element: <AlbumsPage/>},
            {path: 'tags', element: <TagsPage/>},
            {path: '*', element: <NotFoundPage/>}
        ]
    }
])
export default router