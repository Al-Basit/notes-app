import { Navigate, Outlet } from "react-router-dom";
import tokenService from "@/services/token.service";

const AuthRoutes = () => {
  const accessToken = tokenService.getLocalAccessToken();
  if (accessToken) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
};

export default AuthRoutes;
