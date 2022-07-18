import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoutes = () => {
  const auth = Cookies.get("token");

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
