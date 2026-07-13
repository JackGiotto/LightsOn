import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../pages/auth/AuthContext";

export const RootRedirect = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (!user) {
    return <Navigate to="/citizen" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/citizen" replace />;
};