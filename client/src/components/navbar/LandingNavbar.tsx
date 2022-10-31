import { Link } from 'react-router-dom';
import Button from '../styles/button';
import style from './LandingNav.module.css';
import s from '../styles/styles.module.css';
import { useNavigate } from 'react-router-dom';

function LandingNavbar() {
  const navigate = useNavigate();

  return (
    <div className={`${style.background} ${s.card}`}>
      <div className={style.title}>
        <Link to='#home'>CoinTracker</Link>
      </div>
      <ul className={style.navButtons}>
        <Link to='#About'>About Us</Link>
        <Link to='#ReviewLanding'>Reviews</Link>
        <Link to='#ContactUs'>Contact Us</Link>
      </ul>
      {console.log('se actualizo')}
      <div className={style.button}>
        <Button onClick={() => navigate('/register')}>Register</Button>
        <Button gradient onClick={() => navigate('/login')}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default LandingNavbar;
