import PrivateRoute from "@/components/private-route";
import PublicRoute from "@/components/public-route";
import { HomePage } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
