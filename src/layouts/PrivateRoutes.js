import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let token = localStorage.getItem("access_token") || false;
  // neu co token su dung `Outlet` de hien thi route-child, neu khong thi redirect ve `login`

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
