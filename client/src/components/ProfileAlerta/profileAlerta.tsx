import React from "react";
import alerta from "../../assets/alerta.png";
import stilos from "./profileAlerta.module.css";
import Button from "../styles/button";

export default function ProfileAlerta({ abierto, close }) {
  return (
    <div className={`${stilos.contenedor} ${abierto && stilos.open}`}>
      <div className={stilos.box}>
        <div className={stilos.alert}>
          <img className={stilos.img} src={alerta} alt="alerta" />
          <p>YOUR ACCOUNT IS NOT VERIFIED</p>
          <div className={stilos.text}>
            <p>
              In order to edit your profile, first you must to verify your mail
            </p>
          </div>
          <Button gradient onClick={() => close()}>
            X
          </Button>
        </div>
      </div>
    </div>
  );
}
