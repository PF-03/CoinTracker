import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes, PublicRouts } from "../rutas/rutas";

export const AdminGuard = () => {
  const data = useSelector((state: any) => state);
  return data.user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate replace to={PrivateRoutes.HOME} />
  );
};
