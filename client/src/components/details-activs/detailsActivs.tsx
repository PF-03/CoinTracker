import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getDetailsActivos,
  getActivos,
  getWalletData,
} from "../../redux/actions";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineBellAlert } from "react-icons/hi2";
import Sidebar from "../Sidebar/Sidebar";
import s from "./detailsActivs.module.css";
import Button from "../styles/button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Bubble from "../styles/bubbles";
import numberFormat from "../../utils/numberFormat.js";
import alerta from "../../assets/iconNews.png";
import amor from "../../assets/amor.png";
import axios from "axios";
import Swal from "sweetalert2";

type barraProps = {
  porcentaje: number;
};

const Barra = styled.div<barraProps>`
  position: relative;
  width: 20rem;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    width: ${(props) => props.porcentaje}%;
    height: 8px;
    border-radius: 10px;
    overflow: hidden;
    background: linear-gradient(270deg, #7745c8 0%, #b588ff 100%);
    transition: color 0.1s, background-color 0.2s ease-in-out;
      animation: slide 1s ease-in;

  }
  @keyframes slide {
    from {
      transform: translateX(-3rem);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export default function DetailsActivs() {
  let use = useParams();
  const navigate = useNavigate();
  let { nameActi }: any = use;
  const dispatch: any = useDispatch();
  const activos: any = useSelector((state: any) => state.allactivos);
  const details: any = useSelector((state: any) => state.detailsActivos);
  let myWallet: any = useSelector((state: any) => state.walletData);
  let fav = useSelector((state: any) => state.favWallet);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    async function asyn() {
      if (activos.length === 0) {
        await dispatch(getActivos());
        await dispatch(getDetailsActivos(nameActi));
      } else {
        await dispatch(getDetailsActivos(nameActi));
      }
    }
    asyn();
    dispatch(getWalletData(user._id ? user._id : user[0]._id));
  }, [activos, nameActi]);

  let difPrecios = details?.high_24h - details?.low_24h;

  let precio = details?.current_price - details?.low_24h;

  let porcentaje: number = Math.ceil((precio * 100) / difPrecios);

  const favorito = async (el, e) => {
    e.preventDefault();
    let comprobar = myWallet.filter(
      (elemento) => elemento.crypto.toLowerCase() === el.id.toLowerCase()
    );
    let existeFavorito = fav.filter(
      (ele) => ele.crypto.toLowerCase() === el.id.toLowerCase()
    );
    if (comprobar.length === 0 && existeFavorito.length === 0) {
      let fav = {
        crypto: el.id,
        quantity: 0,
        user: user?._id ? user._id : user[0]._id,
        history: { date: new Date(Date.now()), quantity: 0 },
      };
      await axios.post("/wallet", fav).then(() =>
        Swal.fire({
          icon: "success",
          title: "It has been added to your wallet",
          confirmButtonText: "Ok!",
          timer: 1500,
        })
      );
      await dispatch(getWalletData(user._id ? user._id : user[0]._id));
      return;
    }
    Swal.fire({
      icon: "error",
      title: "Already exists in your wallet",
      confirmButtonText: "Ok!",
      timer: 1500,
    });
    return;
  };

  return (
    <>
      <Bubble size="medium" right="10%" bottom={0} />
      <div className={s.contenedor}>
        {!details || details?.id !== nameActi.toString() ? (
          <h3>Cargando</h3>
        ) : (
          <div className={s.box}>
            <div className={s.coin}>
              <div className={s.box_one}>
                <span className={s.rank}>Rank #{details.rank}</span>
                <div className={s.name}>
                  <div className={s.image}>
                    <img src={details.image} />
                  </div>
                  <h3>{details?.name}</h3>
                  <h3>({(details?.symbol).toUpperCase()})</h3>
                </div>
                <div className={s.cBotones}>
                  <div className={s.botones}>
                    <div>
                      <img src={alerta} alt="alerta" />
                    </div>
                    <div onClick={(e) => favorito(details, e)}>
                      <img src={amor} alt="fav" className={s.corazon} />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Barra porcentaje={porcentaje} />
                <div className={s.lowhigh}>
                  <span>{details.low_24h} US$</span>
                  <span>{details.high_24h} US$</span>
                </div>
              </div>
            </div>
            <div className={s.price}>
              <h3>Price {numberFormat(details.current_price, "standard")} </h3>
            </div>
            <div className={s.conInfo}>
              <div className={s.info}>
                <div className={s.boxInfo}>
                  <div>
                    <p className={s.p}>
                      <strong>Capitalizacion del mercado</strong>
                    </p>
                    <p>
                      {numberFormat(
                        details.current_price * details.circulating_supply,
                        "standard"
                      )}
                    </p>
                  </div>
                  <div>
                    <p className={s.p}>
                      {" "}
                      <strong>Volumen de comercio</strong>
                    </p>
                    <p>{numberFormat(details.total_volume, "standard")} </p>
                  </div>
                  <div>
                    <p className={s.p}>
                      <strong>Valoracion tras la dilucion total </strong>
                    </p>
                    <p>
                      {numberFormat(
                        details.current_price * details.max_supply,
                        "standard"
                      )}
                    </p>
                  </div>
                </div>

                <div className={s.boxInfo}>
                  <div>
                    <p className={s.p}>
                      <strong>Cantidad circulante</strong>
                    </p>
                    <p>
                      {numberFormat(details.circulating_supply, "standard")}{" "}
                    </p>
                  </div>
                  <div>
                    <p className={s.p}>
                      <strong>Cantidad total</strong>
                    </p>
                    <p>{numberFormat(details.total_supply, "standard")} </p>
                  </div>
                  <div>
                    <p className={s.p}>
                      <strong>Catidad max.</strong>
                    </p>
                    <p>{numberFormat(details.max_supply, "standard")} </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.button}>
              <Button gradient onClick={() => navigate(-1)}>
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
