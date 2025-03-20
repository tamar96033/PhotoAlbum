import { ApiClient } from "./client";

const authClient = new ApiClient("https://your-api-url.com", {
    requestInterceptor: (req) => {
      const token = localStorage.getItem("token");
      if (token) {
        req.headers = req.headers || {};
        req.headers["Authorization"] = `Bearer ${token}`;
      }
    }
  });
  
  export default authClient;