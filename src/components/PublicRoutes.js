// se chuyen den dashboard neu user da login
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  let token = localStorage.getItem("access_token") || false;

  return !token ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoutes;
