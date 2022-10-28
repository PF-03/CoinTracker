
import { Link } from "react-router-dom";
import Button from "../styles/button";
import style from "./LandingNav.module.css";
import s from '../styles/styles.module.css'

function LandingNavbar() {
  // const userData = useContext(myContext);

  // const logout = () => {
  //   axios
  //     .get('http://localhost:3001/googleauth/logout', { withCredentials: true })
  //     .then((res: AxiosResponse) => {
  //       if (res.data === 'done') {
  //         window.location.href = '/';
  //       }
  //     });
  // };

  return (
    <div className={`${style.background} ${s.card}`}>
      <div className={style.title}>
        <Link to='#home'>CoinTracker</Link>
      </div>
      <ul className={style.navButtons}>
        <Link to="#About">About Us</Link>
        <Link to="#ReviewLanding">Reviews</Link>
        <Link to="#ContactUs">Contact Us</Link>

      </ul>
      <div className={style.button}>
        <Button>Register</Button>
        <Button gradient>Login</Button>
      </div>
    </div>
  );
}

export default LandingNavbar;
