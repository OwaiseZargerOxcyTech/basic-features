import { Navigate } from "react-router-dom";
import React from "react";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const userToken = localStorage.getItem("token");
  const token = userToken && userToken !== "undefined";
  return token ? <Navigate to="/" /> : <>{children}</>;
};

export default PublicRoute;
