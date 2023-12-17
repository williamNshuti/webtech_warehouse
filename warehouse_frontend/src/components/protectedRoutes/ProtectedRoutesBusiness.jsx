import React from "react";
import { Outlet } from "react-router-dom";
import AuthenticationService from "../../api/authentication/AuthenticationService";
import { Navigate } from "react-router-dom";

const useAuth = () => {
  return AuthenticationService.isBusinessLoggedIn();
};
const ProtectedRoutesBusiness = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

// const ProtectedRoutesBusiness = () => {
//   return <Outlet />;
// };

export default ProtectedRoutesBusiness;
