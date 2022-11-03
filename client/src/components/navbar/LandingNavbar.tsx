import Button from "../styles/button";
import style from "./LandingNav.module.css";
import s from "../styles/styles.module.css";
import { useNavigate } from "react-router-dom";
import { PublicRouts } from "../../rutas/rutas";

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
            <a href="/review">Feedback</a>
            <a href="#ContactUs">Contact Us</a>
          </ul>
        </div>
        <div className={style.button}>
          <Button
            onClick={() => {
              navigate(PublicRouts.REGISTER);
            }}
          >
            Register
          </Button>
          <Button
            gradient
            onClick={() => {
              navigate(PublicRouts.LOGIN);
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingNavbar;
