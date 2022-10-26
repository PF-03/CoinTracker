import { Link } from "react-router-dom";
import style from "../styles/LandingNav.module.css";

function LandingNavbar() {
  return (
    <div className={style.background}>
      <div className={style.title}>
        <a href="#home">CoinTracker</a>
      </div>
      <ul>
        {/* el href se refiere a clases asi que los componenetes donde esten los datos de one page deben tener los nombre de clase como esos o combiar lo de acá */}
        <a href="#About">About Us</a>
        <a href="#ReviewLanding">Reviews</a>
        <a href="#ContactUs">Contact Us</a>
      </ul>
      <div className={style.button}>
        <button>Register</button>
      </div>
      {/* <Link to="/register">register</Link> */}
    </div>
  );
}

export default LandingNavbar;
