import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../styles/button";
import stilos from "./profilePassword.module.css";
import Swal from "sweetalert2";
import eyeOpen from "../../assets/eye-opened.png";
import eyeClosed from "../../assets/eye-closed.png";

export const ProfilePassword = ({ isOpen, close }) => {
  const user = useSelector((state: any) => state.user);
  const userId = useSelector((state: any) => state.userID);
  const [eyeState, setEyeState] = useState(false);
  const [state, setState] = useState({
    passwordActual: "",
    passwordNueva: "",
    passwordRepeat: "",
  });
  const [error, setError] = useState({
    err: "true",
  });

  const handleOnChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();
  const validatePassword = async () => {
    if (state.passwordNueva !== state.passwordRepeat) {
      await setError({ err: "false" });
      return;
    }
    await setError({ err: "true" });
    return;
  };

  const closeModal = (e) => {
    e.preventDefault();
    close(e);
  };

  const closeSend = async (e) => {
    e.preventDefault();
    const body = {
      passwordActual: state.passwordActual,
      passwordNueva: state.passwordNueva,
    };

    await axios
      .put(`/users/password/${user._id ? user._id : userId[0]._id}`, body)
      .then(async (e) => {
        await setState({
          passwordActual: "",
          passwordNueva: "",
          passwordRepeat: "",
        });
        await Swal.fire({
          icon: "success",
          title: "Your Password was changed!",
          confirmButtonText: "Ok!",
        });
      })
      .then((e) => close())
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Oops, password current false",
          text: `${e}`,
          confirmButtonText: "Try again",
        });
      });

    console.log("yaaa");
  };

  const passwordEye = (e) => {
    let imgId = e.target.id;
    let eye;
    let passwordInput;
    switch (imgId) {
      case "passwordActualEye":
        eye = document.getElementById(imgId);
        passwordInput = document.getElementById("passwordActual");
        setEyeState(!eyeState);
        if (eyeState) {
          eye.src = eyeOpen;
          passwordInput.setAttribute("type", "password");
        } else {
          eye.src = eyeClosed;
          passwordInput.setAttribute("type", "text");
        }
        break;

      case "passwordNuevaEye":
        eye = document.getElementById(imgId);
        passwordInput = document.getElementById("passwordNueva");
        setEyeState(!eyeState);
        if (eyeState) {
          eye.src = eyeOpen;
          passwordInput.setAttribute("type", "password");
        } else {
          eye.src = eyeClosed;
          passwordInput.setAttribute("type", "text");
        }
        break;

      case "passwordRepeatEye":
        eye = document.getElementById(imgId);
        passwordInput = document.getElementById("passwordRepeat");
        setEyeState(!eyeState);
        if (eyeState) {
          eye.src = eyeOpen;
          passwordInput.setAttribute("type", "password");
        } else {
          eye.src = eyeClosed;
          passwordInput.setAttribute("type", "text");
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={`${stilos.contenedor} ${isOpen && stilos.open}`}>
      <form className={stilos.formulario}>
        <div className={stilos.campos}>
          <label>Current Password</label>
          <div className={stilos.pass}>
            <input
              className={stilos.input}
              name="passwordActual"
              placeholder="Password Actual"
              type="password"
              id="passwordActual"
              onChange={handleOnChange}
            />

            <img
              onClick={passwordEye}
              id="passwordActualEye"
              src={eyeOpen}
              alt="eye icon"
            />
          </div>
        </div>
        <div className={stilos.campos}>
          <label>New Password</label>
          <div className={stilos.pass}>
            <input
              className={stilos.input}
              name="passwordNueva"
              placeholder="Password Nueva"
              type="password"
              id="passwordNueva"
              onChange={handleOnChange}
              onBlur={validatePassword}
            />

            <img
              onClick={passwordEye}
              id="passwordNuevaEye"
              src={eyeOpen}
              alt="eye icon"
            />
          </div>
        </div>
        <div className={stilos.campos}>
          <label>Repeat Password</label>
          <div className={stilos.pass}>
            <input
              className={stilos.input}
              name="passwordRepeat"
              placeholder="Password Repeat"
              type="password"
              id="passwordRepeat"
              onChange={handleOnChange}
              onBlur={validatePassword}
            />

            <img
              onClick={passwordEye}
              id="passwordRepeatEye"
              src={eyeOpen}
              alt="eye icon"
            />
          </div>
          {error.err !== "true" && <p>Password does not match</p>}
        </div>
        <div>
          {state.passwordActual !== "" &&
            state.passwordNueva !== "" &&
            state.passwordRepeat !== "" &&
            error.err !== "false" && (
              <Button gradient={true} onClick={(e) => closeSend(e)}>
                Save
              </Button>
            )}

          <Button gradient onClick={(e) => closeModal(e)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
