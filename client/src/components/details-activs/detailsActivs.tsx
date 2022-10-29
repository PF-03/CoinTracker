import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailsActivos, getActivos } from "../../redux/actions";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineBellAlert } from "react-icons/hi2";
import s from "./detailsActivs.module.css";
import "./barra.css";

export default function DetailsActivs() {
  let use = useParams();
  let { nameActi }: any = use;
  const dispatch: any = useDispatch();
  const details: any = useSelector((state: any) => state.detailsActivos);

  useEffect(() => {
    /* dispatch(getActivos()); */
    dispatch(getDetailsActivos(nameActi));
  }, [dispatch, nameActi]);

  let difPrecios = details?.high_24h - details?.low_24h;
  console.log(difPrecios);
  let precio = details?.current_price - details?.low_24h;
  console.log(precio);
  let porcentaje: Number = Math.ceil((precio * 100) / difPrecios);
  console.log(porcentaje);

  return (
    <div className={s.contenedor}>
      {!details || details?.id !== nameActi.toString() ? (
        <h3>Cargando</h3>
      ) : (
        <div className={s.box}>
          <div className={s.coin}>
            <div className={s.box_one}>
              <span className="rank">Rank #{details.rank}</span>
              <div className={s.name}>
                <div className={s.image}>
                  <img src={details.image} />
                </div>
                <h1>{details?.name}</h1>
                <h1>({(details?.symbol).toUpperCase()})</h1>
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
            <h2>{details.current_price} US$</h2>
          </div>
          <div className={s.conInfo}>
            <div className={s.info}>
              <div className={s.boxInfo}>
                <div>
                  <h4>Capitalizacion del mercado</h4>
                  <p>
                    {details.current_price * details.circulating_supply} US$
                  </p>
                </div>
                <div>
                  <h4>Volumen de comercio</h4>
                  <p>{details.total_volume} US$</p>
                </div>
                <div>
                  <h4>Valoracion tras la dilucion total</h4>
                  <p>{details.current_price * details.max_supply}</p>
                </div>
              </div>

              <div className={s.boxInfo}>
                <div>
                  <h4>Cantidad circulante</h4>
                  <p>{details.circulating_supply} US$</p>
                </div>
                <div>
                  <h4>Cantidad total</h4>
                  <p>{details.total_supply} US$</p>
                </div>
                <div>
                  <h4>Catidad max.</h4>
                  <p>{details.max_supply} US$</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
