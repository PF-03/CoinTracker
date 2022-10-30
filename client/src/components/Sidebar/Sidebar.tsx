import style from "./Sidebar.module.css";
import card from '../styles/styles.module.css'
import { Link } from "react-router-dom";
import iconHome from "../../assets/iconHome.png";
import iconCal from "../../assets/iconCal.png";
import iconLogOut from "../../assets/iconLogOut.png";
import iconNew from "../../assets/iconNews.png";
import iconPor from "../../assets/iconPortfolio.png";
import iconSetting from "../../assets/iconSettings.png";
import iconSwap from "../../assets/iconSwap.png";
import iconUser from "../../assets/iconUser.png";
import { useSelector } from "react-redux";
import { Store } from "redux";

function Sidebar() {
  const user = useSelector((state: any) => state.user); // para el user del readux, cambiar en caso de ser necesario

  return (
    <div className={`${style.sidebar} ${card.card}`}>
      <div className={style.head}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ethereum_logo_translucent.svg/640px-Ethereum_logo_translucent.svg.png"
          alt="logo"
          className={style.logo}
        />
        <Link className={style.title} to="/home">
          {" "}
          CoinTracker
        </Link>
      </div>
      <div className={style.options}>
        <Link to="/home" className={style.data}>
          <img className={style.icon} src={iconUser} alt="user" />
          <span>{/* {user.username} */} Alicia</span>
        </Link>
        <Link to="/home" className={style.data}>
          <img className={style.icon} src={iconHome} alt="home" />
          <span>Home</span>
        </Link>
        <Link to="/porfolio" className={style.data}>
          <img className={style.icon} src={iconPor} alt="home" />
          <span>Portfolio Tracker</span>
        </Link>
        <Link to="/news" className={style.data}>
          <img className={style.icon} src={iconNew} alt="home" />
          <span>News</span>
        </Link>
        <Link to="/swap" className={style.data}>
          <img className={style.icon} src={iconSwap} alt="home" />
          <span>Swap</span>
        </Link>
        <Link to="/calculator" className={style.data}>
          <img className={style.icon} src={iconCal} alt="home" />
          <span>Calculator</span>
        </Link>
      </div>
      <div className={style.footer}>
        <Link to="" className={style.data}>
          <img className={style.icon} src={iconSetting} alt="home" />
          <span>Settings</span>
        </Link>
        <Link to="/" className={style.data}>
          <img className={style.icon} src={iconLogOut} alt="home" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
