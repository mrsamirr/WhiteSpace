import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
}

export const PublicRoutes = ({ children }: PublicRouteProps) => {
  const token = localStorage.getItem("token");

  if (token) {
    // User is already logged in, redirect to home
    return <Navigate to="/home" replace />;
  }

  // User not logged in, allow access
  return children;
};
