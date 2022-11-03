import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes, PublicRouts } from "../rutas/rutas";
import axios from "axios";

export const AdminGuard = () => {
  const data = useSelector((state: any) => state.user._id);
  const valid = getValidate(data);
  return valid ? <Outlet /> : <Navigate replace to={PrivateRoutes.HOME} />;
};

async function getValidate(data) {
  const valor = await axios.get("http://localhost:3001/validate/" + data);
  return valor.data.value;
}
