import style from './Login.module.css';

export const Login = (): JSX.Element => {
  const google = () => {
    window.open('http://localhost:3001/googleauth/google', '_self');
  };

  return (
    <div className={style.layout}>
      <div className={style.container}>
        <div className={style['login-container']}>
          <h2>Welcome!</h2>
          <p>Log in to your account</p>

          <div className={style['login-container-input']}>
            <label htmlFor='email'> Email Address</label>
            <input id='email' type='text' />
          </div>

          <div className={style['login-container-input']}>
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' />
          </div>

          <div className={style['options-container']}>
            <div className={style['options-remember']}>
              <label htmlFor='remember'>Remember</label>
              <input id='remember' type='checkbox' />
            </div>
            <p className={style['options-forgot']}>forgot password?</p>
          </div>

          <div className={style['button-container']}>
            <button>Login</button>
            <button onClick={google}>Login with google</button>
            <p>Register</p>
          </div>
        </div>
      </div>
    </div>
  );
};
