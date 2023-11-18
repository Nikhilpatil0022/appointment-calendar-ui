import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../utilitites/utilities";

const PrivateRoute = () => {
  return getAuthToken() ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
