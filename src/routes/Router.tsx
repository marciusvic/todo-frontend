import PrivateRoute from "@/components/private-route";
import PublicRoute from "@/components/public-route";
import AdminPage from "@/pages/admin";
import CreateTaskPage from "@/pages/create-task";
import { HomePage } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-task"
          element={
            <PrivateRoute>
              <CreateTaskPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
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
