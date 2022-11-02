import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailsActivos, getActivos } from "../../redux/actions";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineBellAlert } from "react-icons/hi2";
import Sidebar from "../Sidebar/Sidebar";
import s from "./detailsActivs.module.css";
import Button from "../styles/button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Bubble from "../styles/bubbles";
import numberFormat from '../../utils/numberFormat.js';

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
  }
`;

export default function DetailsActivs() {
  let use = useParams();
  const navigate = useNavigate();
  let { nameActi }: any = use;
  const dispatch: any = useDispatch();
  const activos: any = useSelector((state: any) => state.allactivos);
  const details: any = useSelector((state: any) => state.detailsActivos);

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
  }, [activos, nameActi]);

  let difPrecios = details?.high_24h - details?.low_24h;

  let precio = details?.current_price - details?.low_24h;

  let porcentaje: number = Math.ceil((precio * 100) / difPrecios);
  console.log(porcentaje);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
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
                      <GrFavorite />
                    </div>
                    <div>
                      <HiOutlineBellAlert />
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
              <h3>Price {numberFormat(details.current_price,'standard')} </h3>
            </div>
            <div className={s.conInfo}>
              <div className={s.info}>
                <div className={s.boxInfo}>
                  <div>
                    <p className={s.p}>
                      <strong>Capitalizacion del mercado</strong>
                    </p>
                    <p>
                      {numberFormat(details.current_price * details.circulating_supply,'standard')} 
                    </p>
                  </div>
                  <div>
                    <p className={s.p}>
                      {" "}
                      <strong>Volumen de comercio</strong>
                    </p>
                    <p>{numberFormat(details.total_volume,'standard')} </p>
                  </div>
                  <div>
                    <p className={s.p}>
                      <strong>Valoracion tras la dilucion total </strong>
                    </p>
                    <p>{numberFormat(details.current_price * details.max_supply,'standard')}</p>
                  </div>
                </div>

                <div className={s.boxInfo}>
                  <div>
                    <p className={s.p}>
                      <strong>Cantidad circulante</strong>
                    </p>
                    <p>{numberFormat(details.circulating_supply,'standard')} </p>
                  </div>
                  <div>
                    <p className={s.p}>
                      <strong>Cantidad total</strong>
                    </p>
                    <p>{numberFormat(details.total_supply, 'standard')} </p>
                  </div>
                  <div>
                    <p className={s.p}>
                      <strong>Catidad max.</strong>
                    </p>
                    <p>{numberFormat(details.max_supply,'standard')} </p>
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
