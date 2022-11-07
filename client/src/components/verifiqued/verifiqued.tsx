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
        await axios.get("http://localhost:3001/verifiqued/" + token);
        await dispatch(getUserId(user._id ? user._id : user[0]._id));
        Swal.fire({
          title: "Your account was verified!",
          imageUrl: "https://cdn-icons-png.flaticon.com/512/6364/6364343.png",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "verifiqued",
          confirmButtonText: "Let's go!",
        });
        navigate("/profile");
      } catch (e) {
        console.log(e);
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
