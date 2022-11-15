import React from "react";
import alerta from "../../assets/alerta.png";
import stilos from "./profileAlerta.module.css";
import Button from "../styles/button";

export default function ProfileAlerta({ abierto, close, titulo, mensaje }) {
  return (
    <div className={`${stilos.contenedor} ${abierto && stilos.open}`}>
      <div className={stilos.box}>
        <div className={stilos.alert}>
          <img className={stilos.img} src={alerta} alt="alerta" />
          <p>{titulo}</p>
          <div className={stilos.text}>
            <p>{mensaje}</p>
          </div>
          <Button gradient onClick={() => close()}>
            X
          </Button>
        </div>
      </div>
    </div>
  );
}
