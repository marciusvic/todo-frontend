import { useAuth } from "@/context/auth-context";
import React from "react";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}

export default PublicRoute;
