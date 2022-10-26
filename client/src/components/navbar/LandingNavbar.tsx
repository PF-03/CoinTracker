import { Link } from "react-router-dom";
import style from "../styles/LandingNav.module.css";

function LandingNavbar() {
  return (
    <div className={style.background}>
      <div className={style.title}>
        <Link to="#home">CoinTracker</Link>
      </div>
      <ul>
        <Link to="#About">About Us</Link>
        <Link to="#ReviewLanding">Reviews</Link>
        <Link to="#ContactUs">Contact Us</Link>
      </ul>
      <div className={style.button}>
        <button>Register</button>
      </div>
    </div>
  );
}

export default LandingNavbar;
