import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes } from "../rutas/rutas";

export const AdminGuard = () => {
  const id = useSelector((state: any) => state.user._id);
  const [val, setVal] = useState<Boolean>();

  useEffect(() => {
    axios
      .get("http://localhost:3001/validate/" + id)
      .then((json) => {
        return json.data;
      })
      .then((info) => {
        console.log(typeof info.value);
        setVal(info.value);
      })
      .catch();
  });
  return (
    (val === true && <Outlet />) ||
    (val === false && <Navigate replace to={PrivateRoutes.HOME} />)
  );
};

export default AdminGuard;
