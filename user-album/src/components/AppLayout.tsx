// import { Outlet } from 'react-router-dom';
// import NavBar from './NavBar';

// function AppLayout() {
//   return (
//     <div>
//       <NavBar />
//       <main>
//         <Outlet /> 
//       </main>
//     </div>
//   );
// }

// export default AppLayout;

import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "./ui/toaster";
import { Outlet, RouterProvider } from "react-router-dom";
// import router from "../Router"; // אם יש לך הגדרות ראוטר
import "../styles/global.css";
import NavBar from "./NavBar";

function App() {
  return (
    <ThemeProvider>
      <NavBar/>
      <main>
        <Outlet/>
      </main>
      {/* <RouterProvider router={router} /> */}
      <Toaster />
    </ThemeProvider>
  );
}

export default App;