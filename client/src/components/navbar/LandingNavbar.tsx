import { Link } from "react-router-dom";
import Button from "../styles/button";
import style from "./LandingNav.module.css";
import s from "../styles/styles.module.css";

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
          <Link to="register">
            <Button>Register</Button>
          </Link>
          <Link to="login">
            <Button gradient>Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingNavbar;
