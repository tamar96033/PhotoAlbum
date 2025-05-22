import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/LoginPage";
import AlbumsPage from "./pages/AlbumsPage";
import TagsPage from "./pages/TagsPage";
import NotFoundPage from "./pages/NotFoundPage";
import GaleryPage from "./pages/GaleryPage";
import AlbumDetails from "./components/albums2/AlbumDetails";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";

import DashboardPage from "./pages/DashboardPage";
import PhotosPage from "./pages/PhotosPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import UploadPage from "./pages/UploadPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        children:[
            // {path: '', element: <HomePage/>},
            {path: '', element: <LandingPage/>},
            {path:'login', element: <LoginPage/>},
            {path:'register', element: <RegisterPage/>},
            {path: 'dashboard/', element: <DashboardLayout/>, children:[
                {path: '', element: <DashboardPage/>},
                {path: 'photos', element: <PhotosPage/>},
                {path: 'upload', element: <UploadPage/>},
                {path: 'albums', element: <AlbumsPage/>},
                { path: 'albums/:id', element: <AlbumDetailPage /> },
            ]},
            {path: 'photos', element: <PhotosPage/>},
            {path: 'pictures', element: <GaleryPage/>},
            // {path: 'albums', element: <AlbumsPage/>},
            // { path: 'albums/:id', element: <AlbumDetails /> },
            {path: 'tags', element: <TagsPage/>},
            {path: '*', element: <NotFoundPage/>},
        ]
    }
])
export default router