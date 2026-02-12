import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../features/auth/AuthContext";
import { useContext } from "react";

export function ProtectedRoute() {
  const context = useContext(AuthContext);
  if (!context) {
    return <Navigate to="/login" replace />;
  }

  const { authState } = context;

  if (authState.status === "loading") {
    return <div>Chargement...</div>;
  }

  return authState.status === "authenticated" ? <Outlet /> : <Navigate to="/login" replace />;
}
