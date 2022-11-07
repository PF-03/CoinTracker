import style from "./Sidebar.module.css";
import card from "../styles/styles.module.css";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import iconHome from "../../assets/iconHome.png";
import iconCal from "../../assets/iconCal.png";
import iconLogOut from "../../assets/iconLogOut.png";
import iconNew from "../../assets/iconNews.png";
import iconPor from "../../assets/iconPortfolio.png";
import iconSetting from "../../assets/iconSettings.png";
import iconSwap from "../../assets/iconSwap.png";
import iconUser from "../../assets/iconUser.png";
import iconDonation from "../../assets/donateIcon1.png";
import { useSelector } from "react-redux";

// codigo guglielmo
////////////////////////////////////////////////////////
import { setUser, getUserId } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { PrivateRoutes, PublicRouts } from "../../rutas/rutas";
//////////////////////////////////////////////////////////
function Sidebar() {
  const user = useSelector((state: any) => state.user); // para el user del readux, cambiar en caso de ser necesario

  //codigo guglielmo
  ////////////////////////////////////////////////////////////
  const dispatch: any = useDispatch();
  const token = useSelector((store: any) => store.userToken);

  const nav = useNavigate();
  const userr = useSelector((state: any) => state.userID);

  const logout = async () => {
    axios
      .get(`http://localhost:3001/logout`, {
        withCredentials: true,
      })
      .then((res: any) => console.log(res.data));

    dispatch({ type: "RESET" });
    nav(PublicRouts.LANDING);
  };

  useEffect(() => {
    const asyncUseEffect = async () => {
      if (token) {
        return await axios
          .get(
            `http://localhost:3001/localauth/profile?secret_token=${await token}`,
            { withCredentials: true }
          )
          .then((res: any) => dispatch(setUser(res.data.user)));
      }
      const googleUser = await axios
        .get(`http://localhost:3001/googleauth/getuser`, {
          withCredentials: true,
        })
        .then((res: any) => res.data);
      if (googleUser) return dispatch(setUser(googleUser));
    };

    asyncUseEffect();
  }, []);
  ///////////////////////////////////////////////////////////

  return (
    <div className={`${style.sidebar} ${card.card}`}>
      <div className={style.head}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ethereum_logo_translucent.svg/640px-Ethereum_logo_translucent.svg.png"
          alt="logo"
          className={style.logo}
        />

        <NavLink className={style.title} to={PrivateRoutes.HOME}>
          {" "}
          CoinTracker
        </NavLink>
      </div>
      <div className={style.options}>
        {Object.keys(user).length !== 0 && (
          <Link to="/profile" className={style.data}>
            <img
              className={style.icon}
              src={user.image ? user.image.imageURL : iconUser}
              alt="user"
            />
            <span>
              {user[0]?.username
                ? user[0].username
                : user.username || "Default"}
            </span>
          </Link>
        )}
        <Link to="/home" className={style.data}>
          <img className={style.icon} src={iconHome} alt="home" />
          <span>Home</span>
        </Link>
        <Link to={PrivateRoutes.PORTFOLIO} className={style.data}>
          <img className={style.icon} src={iconPor} alt="portfolio" />
          <span>Portfolio Tracker</span>
        </Link>
        <Link to={PrivateRoutes.NEWS} className={style.data}>
          <img className={style.icon} src={iconNew} alt="news" />
          <span>News</span>
        </Link>
        <Link to={PrivateRoutes.SWAP} className={style.data}>
          <img className={style.icon} src={iconSwap} alt="swap" />
          <span>Swap</span>
        </Link>
        <Link to={PrivateRoutes.CALCULATOR} className={style.data}>
          <img className={style.icon} src={iconCal} alt="calculator" />
          <span>Calculator</span>
        </Link>
        <Link to={PrivateRoutes.DONATE} className={style.data}>
          <img className={style.icon} src={iconDonation} alt="calculator" />
          <span>Donate</span>
        </Link>
      </div>
      <div className={style.footer}>
        {Object.keys(user).length !== 0 ? (
          <span onClick={() => logout()} className={style.data}>
            <img className={style.icon} src={iconLogOut} alt="home" />
            <span>Logout</span>
          </span>
        ) : (
          <Link to="/login" className={style.data}>
            <img className={style.icon} src={iconLogOut} alt="home" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
