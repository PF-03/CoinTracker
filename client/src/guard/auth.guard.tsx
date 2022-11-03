import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRouts } from "../rutas/rutas";

export const AuthGuard = () => {
  const data = useSelector((state: any) => state);
  return data.userToken ? (
    <Outlet />
  ) : (
    <Navigate replace to={PublicRouts.LOGIN} />
  );
};

export default AuthGuard;
