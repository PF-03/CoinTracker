import Button from "../styles/button";
import style from "./LandingNav.module.css";
import s from "../styles/styles.module.css";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes, PublicRouts } from "../../rutas/rutas";
import { UserKey } from "../../utils/LocalStorageData";

function LandingNavbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem(UserKey);

  return (
    <div className={style.background}>
      <div className={s.card}>
        <div>
          <div className={style.title}>
            <a href="#home">CoinTracker</a>
          </div>
          <ul className={style.navButtons}>
            <a href="#About">About Us</a>
            <a href="#Reviews">Feedback</a>
            <a href="#ContactUs">Contact Us</a>
          </ul>
        </div>

        <div className={style.button}>
          {user ? (
            <Button
              gradient
              onClick={() => {
                navigate(PrivateRoutes.HOME);
              }}
            >
              Home
            </Button>
          ) : (
            <div>
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
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingNavbar;
