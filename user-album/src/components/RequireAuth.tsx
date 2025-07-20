
import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const isAuthenticated = !!localStorage.getItem('token');
  const location = useLocation();

  if (!isAuthenticated) {
    // נשלח אותו לדף התחברות
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
