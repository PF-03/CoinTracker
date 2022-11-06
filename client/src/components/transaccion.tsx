import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function Transaccion({ props }) {
  const [wallet, setWallet] = useState({});
  let total: number = 1 * props.precio;
  let fecha = new Date();
  let date = fecha.toDateString();

  return (
    <div>
      <div>
        <form>
          <div>
            <p>Precio por moneda</p>
            <div>
              <input placeholder={props.precio || "Precio"} />
              <label>USD</label>
            </div>
          </div>

          <div>
            <p>Cantidad</p>
            <div>
              <input placeholder="1" />
              <label>{props.symbol}</label>
            </div>
          </div>

          <div>
            <p>Total gastado</p>
            <div>
              <input placeholder={`${total}`} />
              <label>{props.symbol}</label>
            </div>
          </div>

          <div>
            <p>Fecha</p>
            <div>
              <input placeholder={date} />
              <label>{props.symbol}</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
