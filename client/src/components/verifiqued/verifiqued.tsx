import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getUserId } from "../../redux/actions";

export default function Verifiqued() {
  const params = useParams();
  const token = params.token;
  const user = useSelector((state: any) => state.user);
  const dispatch: any = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    const funcion = async () => {
      try {
        await axios.get("/verifiqued/" + token);
        await dispatch(getUserId(user._id ? user._id : user[0]._id));
        Swal.fire({
          icon: "success",
          title: "Your account was verified!",
          confirmButtonText: "Let's go!",
        });
        navigate("/profile");
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Oops, something went wrong",
          text: `${e}`,
          confirmButtonText: "Try again",
        });
      }
    };
    funcion();
  }, [token]);

  return (
    <div>
      <h1>Mail verificado</h1>
    </div>
  );
}
