import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in, redirect to signin
    return <Navigate to="/signup" replace />;
  }

  // Logged in, allow access
  return children;
};
