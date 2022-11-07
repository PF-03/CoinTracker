import React, { useState } from "react";
import { useDispatch } from "react-redux";
import diseño from "./transaccion.module.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";
import swap from "../../assets/iconSwap.png";
import Button from "../styles/button";
import { postWallet } from "../../redux/actions";
export default function Transaccion() {
  let name = "Bitcoin";
  let user = "id";
  let quantity = "1";
  let precio = "21.334,28";
  const dispatch: any = useDispatch();
  const [cambio, setCambio] = useState(false);
  const [wallet, setWallet] = useState({
    date: new Date(),
    quantity: "1",
    precio: "21.334,28",
    gastado: "",
  });
  let gastado2 = wallet.gastado
    ? parseFloat(wallet.gastado)
    : parseFloat(wallet.precio);

  const cambioWallet = {
    date: wallet.date,
    quantity: wallet.quantity,
    precio:
      cambio === false
        ? wallet.precio
        : (
            gastado2 / parseFloat(wallet.quantity ? wallet.quantity : "1")
          ).toString(),
    gastado:
      cambio === false
        ? (
            parseFloat(wallet.quantity ? wallet.quantity : "1") *
            parseFloat(wallet.precio ? wallet.precio : precio)
          ).toString()
        : wallet.gastado,
  };

  const handleOnChange = (e) => {
    setWallet({ ...wallet, [e.target.name]: e.target.value });
  };

  const cambios = (e) => {
    e.preventDefault();
    setCambio(!cambio);
  };
  const handleSubmit = async () => {
    let body = {
      crypto: name,
      user: user,
      quantity: quantity + parseFloat(wallet.quantity),
      history: {
        date: wallet.date,
        quantity: wallet.quantity + quantity,
      },
    };
    dispatch(postWallet(body));
  };

  return (
    <div>
      <div>
        <img src={swap} alt="cambiar" onClick={cambios} />
        <label></label>
        <form>
          <div className={diseño.boxTexto}>
            <p>{cambio === false ? "Precio por moneda" : "Total gastado"}</p>
            <div className={diseño.info}>
              <input
                className={diseño.input}
                placeholder={
                  cambio === false ? cambioWallet.precio : cambioWallet.gastado
                }
                type="number"
                name={cambio === false ? "precio" : "gastado"}
                onChange={handleOnChange}
              />
              <label>USD</label>
            </div>
          </div>

          <div className={diseño.boxTexto}>
            <p>Cantidad</p>
            <div className={diseño.info}>
              <input
                className={diseño.input}
                placeholder="1"
                type="number"
                name="quantity"
                onChange={handleOnChange}
              />
              <label>BTC</label>
            </div>
          </div>

          <div className={diseño.boxTexto}>
            <p>{cambio === false ? "Total gastado" : "Precio por moneda"}</p>
            <div className={diseño.info}>
              <input
                className={diseño.input}
                placeholder={
                  cambio === false ? cambioWallet.gastado : cambioWallet.precio
                }
                type="number"
                disabled={true}
              />
              <label>BTC</label>
            </div>
          </div>

          <div className={diseño.boxTexto}>
            <p>Fecha</p>
            <div className={diseño.info}>
              <Flatpickr
                className={diseño.date}
                value={wallet.date}
                onChange={([dates]) => {
                  setWallet({ ...wallet, date: dates });
                }}
              />
            </div>
          </div>
          <Button gradient onClick={handleSubmit}>
            Guardar
          </Button>
          <Button>Cancelar</Button>
        </form>
      </div>
    </div>
  );
}
