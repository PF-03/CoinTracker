import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { setUser } from "../redux/actions";
import { PublicRouts } from "../rutas/rutas";

export const AuthGuard = () => {
  const data = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const [state, setState] = useState<any>();

  useEffect(() => {
    async function login() {
      if (!data.user.googleId && !data.userToken) {
        axios
          .get(`/googleauth/getuser`, {
            withCredentials: true,
          })
          .then((x) => {
            setState(x.data.googleId);
            dispatch(setUser(x.data));
          });
      }
    }

    if (!data.user.type) {
      // console.log("si entro a este condicional");
      axios
        .get("/validate/" + data.user._id)
        .then((json) => {
          return json.data;
        })
        .then((info) => {
          // console.log(typeof info.value);
          dispatch(setUser({ ...data.user, type: info.value }));
        })
        .catch();
    }

    login();
  }, []);

  if (data.userToken) {
    return data.userToken ? (
      <Outlet />
    ) : (
      <Navigate replace to={PublicRouts.LOGIN} />
    );
  } else {
    return (
      (data.user.googleId && <Outlet />) ||
      (!data.user.googleId && <Navigate replace to={PublicRouts.LOGIN} />)
    );
  }
};

export default AuthGuard;
