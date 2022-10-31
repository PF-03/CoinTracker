import style from './Login.module.css';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import Bubble from '../../components/styles/bubbles';
import googleButton from '../../assets/googleBtn.png';

const Login: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  type Values = {
    email: string;
    password: string;
  };

  const [values, setValues] = useState<Values>({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const google = () => {
    window.open('http://localhost:3001/googleauth/google', '_self');
  };

  const local = async (e: any) => {
    e.preventDefault();
    try {
      await axios
        .post('http://localhost:3001/localauth/login', values, {
          withCredentials: true,
        })
        .then((res: AxiosResponse) => {
          dispatch(setUserToken(res.data.token));
        });
      alert('succesful');
      navigate('/home');
    } catch (e) {
      alert('someting goes wrong');
    }
  };

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
            <label htmlFor='password'>Password</label>
            <input
              onChange={(e) => handleChange(e)}
              id='password'
              name='password'
              type='password'
              value={values.password}
              className={style['login-input']}
            />
          </div>

          <div className={style['options-container']}>
            <div className={style['options-remember']}>
              <label className={style['options']} htmlFor='remember'>
                Remember
              </label>
              <input id='remember' type='checkbox' />
            </div>
            <p className={style['options']}>forgot password?</p>
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