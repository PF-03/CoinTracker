import { useState } from "react";
import axios from "axios";
import "./FormRegister.css";
import Button from "../../components/styles/button";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../redux/actions/index";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import eyeOpen from '../../assets/eye-opened.png'
import eyeClosed from '../../assets/eye-closed.png'

function FormRegister() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    mail: "",
    name: "",
    lastname: "",
    disabled: true,
    errors: {
      username: "",
      password: "",
      passwordConfirm: "",
      mail: "",
      name: "",
      lastname: "",
    },
  });

  const [eyeState, setEyeState] = useState(false);

  function validateForm(errors: Object) {
    let usernameInput = document.getElementById("username");
    let mailInput = document.getElementById("mail");
    let passwordInput = document.getElementById("password");
    let username = usernameInput.getAttribute("value");
    let mail = mailInput.getAttribute("value");
    let password = passwordInput.getAttribute("value");

    if (!username || !mail || !password) {
      setInputs({
        ...inputs,
        disabled: true,
      });
      return;
    }

    let valid = true;
    Object.values(errors).forEach((val) => {
      if (val.length > 0) {
        valid = false;
      }
    });
    if (valid) {
      setInputs({
        ...inputs,
        disabled: false,
      });
      //   submitBtn?.classList.add("submit-btn-active")
    } else {
      setInputs({
        ...inputs,
        disabled: true,
      });
      //   submitBtn?.classList.remove("submit-btn-active")
    }
  }

  function handleChange(e: any) {
    type InputField =
      | "name"
      | "lastname"
      | "username"
      | "mail"
      | "password"
      | "passwordConfirm";

    const { value } = e.target;
    const name: InputField = e.target.name;
    let errors = inputs.errors;

    switch (name) {
      case "name":
        break;
      case "lastname":
        break;
      case "username":
        errors.username = value.length < 5 ? "Usa minimo 5 letras" : "";
        break;
      case "mail":
        let emailPattern = /\S+@\S+\.\S+/; // Expresion Regular para validar Emails.
        errors.mail = !emailPattern.test(value)
          ? "Inserta un email valido"
          : "";
        break;
      case "password":
        errors.password = value.length < 8 ? "Usa minimo 8 caracteres" : "";
        errors.passwordConfirm =
          value === inputs.password ? "" : "Las contraseñas no son iguales";
        break;
      case "passwordConfirm":
        errors.passwordConfirm =
          value === inputs.password ? "" : "Las contraseñas no son iguales";
        break;
      default:
        break;
    }

    inputs[name] = value;
    setInputs({
      ...inputs,
      [name]: value,
      errors,
    });

    if (name !== "name" && name !== "lastname") {
      validateForm(inputs.errors);
    }
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function submitForm(e: any) {
    e.preventDefault();
    try {
      await axios
        .post("/localauth/signup", {
          username: inputs.username,
          password: inputs.password,
          mail: inputs.mail,
          name: inputs.name,
          lastname: inputs.lastname,
        })
        .then((res) => {
          dispatch(setUserToken(res.data.token));
        });
      Swal.fire({
        icon: 'success',
        title: 'Your account was created!',
        confirmButtonText: "Let's go!"
      })
      navigate("/home");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops, something went wrong',
        text: `${error}`,
        confirmButtonText: 'Try again'
      })
    }
  }
  const google = () => {
    window.open(`${import.meta.env.VITE_SERVER_API}/googleauth/google`, "_self");
  };

  function passwordEye(e) {
    e.preventDefault()
    const id = e.target.id;
    let eye;
    let passwordInput;
    switch(id) {
        case 'passwordEye':
            eye = document.getElementById(id);
            passwordInput = document.getElementById('password');
            setEyeState(!eyeState);
            if(eyeState) {
                eye.src = eyeOpen;
                passwordInput.setAttribute("type", "password");
            } else {
                eye.src = eyeClosed;
                passwordInput.setAttribute("type", "text");
            }
            break;
        case 'confirmPasswordEye':
            eye = document.getElementById(id);
            passwordInput = document.getElementById('passwordConfirm');
            setEyeState(!eyeState);
            if(eyeState) {
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
  }

  return (
    <div className="signUpContainer">
      <h2>Create your account:</h2>

      <button className="googleSignUp" onClick={google}>
        Register with Google
      </button>

      <p className="orText">Or</p>

      <form onSubmit={submitForm} className="signUpForm">
        <label className="registerFormLabel" htmlFor="name">
          Name:{" "}
        </label>
        <input
          className="registerFormInput"
          name="name"
          id="name"
          onChange={handleChange}
          placeholder="Juan"
        />
        {!inputs.errors.name ? null : (
          <p className="inputError">{inputs.errors.name}</p>
        )}

        <label className="registerFormLabel" htmlFor="lastname">
          Lastname:{" "}
        </label>
        <input
          className="registerFormInput"
          name="lastname"
          id="lastname"
          onChange={handleChange}
          placeholder="Perez"
        />
        {!inputs.errors.lastname ? null : (
          <p className="inputError">{inputs.errors.lastname}</p>
        )}

        <label className="registerFormLabel" htmlFor="username">
          Username:
        </label>
        <input
          required
          className="registerFormInput"
          name="username"
          id="username"
          onChange={handleChange}
          placeholder="Perez"
          value={inputs.username}
        />
        {!inputs.errors.username ? null : (
          <p className="inputError">{inputs.errors.username}</p>
        )}

        <label className="registerFormLabel" htmlFor="mail">
          Email:{" "}
        </label>
        <input
          required
          className="registerFormInput"
          name="mail"
          id="mail"
          onChange={handleChange}
          placeholder="juanito@gmail.com"
          value={inputs.mail}
        />
        {!inputs.errors.mail ? null : (
          <p className="inputError">{inputs.errors.mail}</p>
        )}

        <div className="password-label-eye">
            <label className="registerFormLabel" htmlFor="password">
            Password:{" "}
            </label>
            <img onClick={passwordEye} id="passwordEye" src={eyeOpen} alt="eye icon"/>
        </div>
        <input
          required
          className="registerFormInput"
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          placeholder=""
          value={inputs.password}
        />
        {!inputs.errors.password ? null : (
          <p className="inputError">{inputs.errors.password}</p>
        )}

        <div className="password-label-eye">
            <label className="registerFormLabel" htmlFor="passwordConfirm">
            Confirm password:{" "}
            </label>
            <img onClick={passwordEye} id="confirmPasswordEye" src={eyeOpen} alt="eye icon"/>
        </div>
        <input
          className="registerFormInput"
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          onChange={handleChange}
          placeholder=""
        />
        {!inputs.errors.passwordConfirm ? null : (
          <p className="inputError">{inputs.errors.passwordConfirm}</p>
        )}

        {/* <input className='submit-btn' id='submit-btn' type="submit" value='Crear cuenta' disabled={inputs.disabled}/> */}
        <Button
          gradient={inputs.disabled ? false : true}
          className="submit-btn"
          id="submit-btn"
          type="submit"
          disabled={inputs.disabled}
        >
          Create
        </Button>
      </form>

      <p className="loginText">
        Already have an account? <a href="">Login</a>
      </p>
    </div>
  );
}

export default FormRegister;
