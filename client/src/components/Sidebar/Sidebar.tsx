import style from "../styles/Sidebar.module.css";

function Sidebar() {
  return (
    <div className={style.sidebar}>
      <span className={style.head}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ethereum_logo_translucent.svg/640px-Ethereum_logo_translucent.svg.png"
          alt="logo"
          className={style.logo}
        />
        <span>CoinTracker</span>
      </span>
      <span>opciones</span>
      <span>cerrar</span>
    </div>
  );
}

export default Sidebar;
