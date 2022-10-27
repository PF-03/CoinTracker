import axios from 'axios';
import { Link } from 'react-router-dom';
import style from '../styles/LandingNav.module.css';
import { myContext } from '../../Context';
import { useContext } from 'react';

function LandingNavbar() {
  const userData = useContext(myContext);

  const logout = () => {
    axios
      .get('http://localhost:3001/googleauth/logout', { withCredentials: true })
      .then((res: AxiosResponse) => {
        if (res.data === 'done') {
          window.location.href = '/';
        }
      });
  };

  return (
    <div className={style.background}>
      <div className={style.title}>
        <Link to='#home'>CoinTracker</Link>
      </div>
      <ul>
        <Link to='#About'>About Us</Link>
        <Link to='#ReviewLanding'>Reviews</Link>
        <Link to='#ContactUs'>Contact Us</Link>
      </ul>

      {userData ? (
        <div className={style.button}>
          <button onClick={logout}>Log out</button>
        </div>
      ) : (
        <Link to='/login'>
          <div className={style.button}>
            <button>Log in</button>
          </div>
        </Link>
      )}
    </div>
  );
}

export default LandingNavbar;
