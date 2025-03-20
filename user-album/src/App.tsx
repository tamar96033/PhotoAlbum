import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Router";
import { ApiClientProvider } from "./contexts/ApiClientContext";

function App() {
  //const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
  
  // return <>app</>;
  return(
    <ApiClientProvider>
    <RouterProvider router={router}/>
  </ApiClientProvider>
  )
}

export default App;
