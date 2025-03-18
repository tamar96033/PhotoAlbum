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