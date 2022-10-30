import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailsActivos } from "../../redux/actions";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineBellAlert } from "react-icons/hi2";
import Sidebar from "../Sidebar/Sidebar";
import s from "./detailsActivs.module.css";
import Button from "../styles/button";
import "./barra.css";
import { useNavigate } from "react-router-dom";

export default function DetailsActivs() {
  let use = useParams();
  const navigate = useNavigate();
  let { nameActi }: any = use;
  const dispatch: any = useDispatch();
  const details: any = useSelector((state: any) => state.detailsActivos);

  useEffect(() => {
    /* dispatch(getActivos()); */
    dispatch(getDetailsActivos(nameActi));
  }, [dispatch, nameActi]);

  let difPrecios = details?.high_24h - details?.low_24h;

  let precio = details?.current_price - details?.low_24h;

  let porcentaje: Number = Math.ceil((precio * 100) / difPrecios);
  console.log(porcentaje);

  return (
    <div>
      <Sidebar />
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
                      {" "}
                      <GrFavorite />
                    </div>
                    <div>
                      {" "}
                      <HiOutlineBellAlert />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={`barra barra_${porcentaje}`}></div>
                <div className={s.lowhigh}>
                  <span>{details.low_24h} US$</span>
                  <span>{details.high_24h} US$</span>
                </div>
              </div>
            </div>
            <div className={s.price}>
              <h3>Price {details.current_price} US$</h3>
            </div>
            <div className={s.conInfo}>
              <div className={s.info}>
                <div className={s.boxInfo}>
                  <div>
                    <p className={s.p}>
                      <strong>Capitalizacion del mercado</strong>
                    </p>
                    <p>
                      {details.current_price * details.circulating_supply} US$
                    </p>
                  </div>
                  <div>
                    <p className={s.p}>
                      {" "}
                      <strong>Volumen de comercio</strong>
                    </p>
                    <p>{details.total_volume} US$</p>
                  </div>
                  <div>
                    <p className={s.p}>
                      <strong>Valoracion tras la dilucion total </strong>
                    </p>
                    <p>{details.current_price * details.max_supply}</p>
                  </div>
                </div>

                <div className={s.boxInfo}>
                  <div>
                    <p className={s.p}>
                      <strong>Cantidad circulante</strong>
                    </p>
                    <p>{details.circulating_supply} US$</p>
                  </div>
                  <div>
                    <p className={s.p}>
                      <strong>Cantidad total</strong>
                    </p>
                    <p>{details.total_supply} US$</p>
                  </div>
                  <div>
                    <p className={s.p}>
                      <strong>Catidad max.</strong>
                    </p>
                    <p>{details.max_supply} US$</p>
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
    </div>
  );
}
