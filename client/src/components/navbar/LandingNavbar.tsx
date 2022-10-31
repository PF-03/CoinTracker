import Button from '../styles/button';
import style from './LandingNav.module.css';
import s from '../styles/styles.module.css';
import { useNavigate } from 'react-router-dom';

function LandingNavbar() {
  const navigate = useNavigate();

  return (
    <div className={style.background}>
      <div className={s.card}>
        <div>
          <div className={style.title}>
            <a href="#home">CoinTracker</a>
          </div>
          <ul className={style.navButtons}>
            <a href="#About">About Us</a>
            <a href="#ReviewLanding">Reviews</a>
            <a href="#ContactUs">Contact Us</a>
          </ul>
        </div>
        <div className={style.button}>
            <Button onClick={() => {navigate('/register')}}>Register</Button>
            <Button gradient onClick={() => {navigate('/login')}}>Login</Button>
        </div>
      </div>
    </div>
  );
}

export default LandingNavbar;
