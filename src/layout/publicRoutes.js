import React from "react";
import { Navigate, Outlet } from "react-router-dom"; 

const PublicRoutes = () => {
  let isLogin = JSON.parse(localStorage.getItem("isLogin"));
  
  if (isLogin) {
    return <Navigate replace to="/dashboard" />;
  } else {
    return <Outlet />;
  }
};

export default PublicRoutes;
