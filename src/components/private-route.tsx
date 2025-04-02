import React from "react";
import { Navigate } from "react-router-dom";
import { NavBar } from "./navbar";
import { useAuth } from "@/context/auth-context";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default PrivateRoute;
