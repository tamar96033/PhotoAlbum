import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Router";
import { ApiClientProvider } from "./contexts/ApiClientContext";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  //const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
  
  // return <>app</>;
  return(
    <ApiClientProvider>
    app
    <Login/>
    <Register/>
    {/* <Pictures/> */}
    <RouterProvider router={router}/>
  </ApiClientProvider>
  )
}

export default App;
