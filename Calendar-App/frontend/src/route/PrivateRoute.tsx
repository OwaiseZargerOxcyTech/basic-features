import { Navigate } from "react-router-dom";
import React from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const userToken = localStorage.getItem("token");
  const token = userToken && userToken !== "undefined";
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
