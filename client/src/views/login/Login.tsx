import style from "./Login.module.css";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { setUser, setUserToken } from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import Bubble from "../../components/styles/bubbles";
import googleButton from "../../assets/googleBtn.png";
import eyeOpen from "../../assets/eye-opened.png";
import eyeClosed from "../../assets/eye-closed.png";
import { PrivateRoutes, PublicRouts } from "../../rutas/rutas";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";

const Login: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    id,
    googleId,
    username,
    mail,
    name,
    lastname,
    type,
    image,
    activos,
    status,
  } = useParams();

  const [nameToShow, setNametoShow] = useState('');

  useEffect(() => {
    const asyncUseEffect = async () => {
      //   const googleUser = await axios
      //     .get(`/googleauth/getuser`, {
      //       withCredentials: true,
      //     })
      //     .then((res: any) => res.data);
      const googleUser = {
        _id: id,
        googleId,
        username,
        mail,
        name,
        lastname,
        type: [type],
        image,
        activos,
        status,
      };
      if (googleUser) {
        navigate(PrivateRoutes.HOME);
        return dispatch(setUser(googleUser));
      }
    };

    if (googleId) {
      asyncUseEffect();
    }
  });

  type Values = {
    email: string;
    password: string;
  };

  const [values, setValues] = useState<Values>({
    email: '',
    password: '',
  });

  const [eyeState, setEyeState] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'email') {
      setValues({
        ...values,
        [event.target.name]: event.target.value.trim().toLowerCase(),
      });
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
    }
  };

  const google = () => {
    window.open(
      `${import.meta.env.VITE_SERVER_API}/googleauth/google`,
      '_self'
    );
  };

  const local = async (e: any) => {
    e.preventDefault();
    try {
        let res = await axios
        .post("/localauth/login", values, {
          withCredentials: true,
        })
        dispatch(setUserToken(res.data.token));
        Swal.fire({
            icon: 'success',
            title: 'Nice to have you back!',
            confirmButtonText: "Let's go!",
        });
        navigate(PrivateRoutes.HOME);
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops, something went wrong',
            text: `${e}`,
            confirmButtonText: 'Try again',
        });
    }
  };

  function passwordEye(e) {
    e.preventDefault();
    const id = e.target.id;
    const eye: any = document.getElementById(id);
    const passwordInput = document.getElementById('password');
    setEyeState(!eyeState);
    if (eyeState) {
      eye.src = eyeOpen;
      passwordInput.setAttribute('type', 'password');
    } else {
      eye.src = eyeClosed;
      passwordInput.setAttribute('type', 'text');
    }
  }

  return (
    <div className={style.layout}>
      <Bubble color='purple' size='large' left='-165px' top='-240px' />
      <Bubble color='blue-light' size='medium' left='683px' />
      <Bubble size='small' left='100px' bottom='-50px' />

      <div className={style.container}>
        <div className={style['title-container']}>
          <h4 className={style.title}>Welcome to</h4>
          <h1 className={style.title}>CoinTracker</h1>
        </div>
        <div className={style['login-container']}>
          <h2>Hi!</h2>
          <p>Log in to your account</p>

          <div className={style['login-container-input']}>
            <label htmlFor='email'> Email Address</label>
            <input
              onChange={(e) => handleChange(e)}
              id='email'
              name='email'
              type='text'
              value={values.email}
              className={style['login-input']}
            />
          </div>

          <div className={style['login-container-input']}>
            <div className={style['password-label-eye']}>
              <label htmlFor='password'>Password</label>
              <img
                onClick={passwordEye}
                id='passwordEye'
                src={eyeOpen}
                alt='eye icon'
              />
            </div>
            <input
              onChange={(e) => handleChange(e)}
              id='password'
              name='password'
              type='password'
              value={values.password}
              className={style['login-input']}
            />
          </div>


          <div className={style["options-container"]}>
            {/* <div className={style["options-remember"]}>
            <p className={style["options"]}>forgot password?</p> */}
            <Link to={PublicRouts.REGISTER}><p className={style["options"]}>Don't have an account?</p></Link
          </div>

          <div className={style['button-container']}>
            <button className={style['login-button']} onClick={local}>
              Login
            </button>
            <img
              src={googleButton}
              className={style['google-button']}
              onClick={google}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
