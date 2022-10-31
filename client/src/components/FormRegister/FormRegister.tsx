import { useState } from "react";
import axios from "axios";
import "./FormRegister.css";
import Button from "../styles/button";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../redux/actions/index";
import { useNavigate } from "react-router-dom";

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
        .post("http://localhost:3001/localauth/signup", {
          username: inputs.username,
          password: inputs.password,
          mail: inputs.mail,
          name: inputs.name,
          lastname: inputs.lastname,
        })
        .then((res) => {
          console.log(res.data.token);
          dispatch(setUserToken(res.data.token));
        });
      alert("Genial, tu cuenta se creo con éxito.");
      navigate("/home");
    } catch (error) {
      alert(`Ups, algo salio mal intenta de nuevo.\n${error}`);
    }
  }
  const google = () => {
    window.open("http://localhost:3001/googleauth/google", "_self");
  };

  return (
    <div className="signUpContainer">
      <h2>Crea tu cuenta:</h2>

      <button className="googleSignUp" onClick={google}>
        Registrate con Google
      </button>

      <p className="orText">O</p>

      <form onSubmit={submitForm} className="signUpForm">
        <label className="registerFormLabel" htmlFor="name">
          Nombre:{" "}
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
          Apellido:{" "}
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
          Usuario:
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

        <label className="registerFormLabel" htmlFor="password">
          Contraseña:{" "}
        </label>
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

        <label className="registerFormLabel" htmlFor="passwordConfirm">
          Confirma contraseña:{" "}
        </label>
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
          Crear cuenta
        </Button>
      </form>

      <p className="loginText">
        ¿Ya tienes una cuenta? <a href="">Haz login</a>
      </p>
    </div>
  );
}

export default FormRegister;
