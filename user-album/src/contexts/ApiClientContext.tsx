// // src/context/AuthContext.tsx

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { AuthService } from "../services/AuthService";

// const AuthContext = createContext<any>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const expired = AuthService.isTokenExpired();
//     setIsAuthenticated(!expired);
//   }, []);

//   const login = (token: string) => {
//     AuthService.saveToken(token);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     AuthService.removeToken();
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import { createContext } from "react";
import { ApiClient } from "../api/client";
import { useContext } from "react";

export const ApiClientContext = createContext<ApiClient | null>(null)

export const useApiClient = () => {
    const context = useContext(ApiClientContext);
    if (!context) {
      throw new Error('useApiClient must be used within ApiClientProvider');
    }
    return context;
  };

export const ApiClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

    const apiClient = new ApiClient(API_BASE_URL)

    return (
        <ApiClientContext.Provider value={apiClient}>
            {children}
        </ApiClientContext.Provider>
    );
}