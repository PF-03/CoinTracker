import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import negativos from "./transaccionNegativa.module.css";
import Button from "../../styles/button";
import Flatpickr from "react-flatpickr";
import swap from "../../../assets/iconSwap.png";
import "flatpickr/dist/themes/material_orange.css";
import axios from "axios";
import Swal from "sweetalert2";
export default function TransaccionNegativa({ open, close }) {
  const myWallet = useSelector((state: any) => state.walletData);
  const allAssets = useSelector((state: any) => state.allactivos);
  const modalName = useSelector((state: any) => state.nameTransaccion);
  const user = useSelector((state: any) => state.user);
  const [cambio, setCambio] = useState(false);

  const precioMoneda = allAssets.filter(
    (el: any) => el.id.toLowerCase() === modalName.toLowerCase()
  )[0];
  const existeWallet = myWallet.filter(
    (el: any) => el.name.toLowerCase() === modalName.toLowerCase()
  );
  let precio = precioMoneda?.current_price;
  const [wallet, setWallet] = useState({
    date: new Date(Date.now()),
    quantity: "1",
    precio: 0,
    recibido: 0,
  });

  let recibido2 = wallet.recibido
    ? wallet.recibido
    : parseFloat(wallet.quantity ? wallet.quantity : "1") *
      (wallet.precio ? wallet.precio : precio);

  const cambioWallet = {
    date: wallet.date,
    quantity: wallet.quantity,
    precio:
      cambio === false
        ? wallet.precio
          ? wallet.precio
          : precio
        : wallet.recibido
        ? wallet.recibido / parseFloat(wallet.quantity ? wallet.quantity : "1")
        : recibido2 / parseFloat(wallet.quantity ? wallet.quantity : "1"),
    recibido:
      parseFloat(wallet.quantity ? wallet.quantity : "1") *
      (wallet.precio ? wallet.precio : precio),
  };

  const handleOnChange = (e) => {
    setWallet({ ...wallet, [e.target.name]: e.target.value });
  };

  const minima = async (e) => {
    if (existeWallet.length !== 0) {
      let minima = parseInt(existeWallet[0].quantity) === 0 ? "0" : "1";
      await setWallet({ ...wallet, quantity: minima });
      return;
    }
    setWallet({ ...wallet, quantity: "0" });
  };

  const maxima = async (e) => {
    if (existeWallet.length !== 0) {
      let max = existeWallet[0].quantity;
      await setWallet({ ...wallet, quantity: max });
      return;
    }
    setWallet({ ...wallet, quantity: "0" });
  };

  const enviar = async (e) => {
    e.preventDefault();
    if (
      existeWallet.length !== 0 &&
      existeWallet[0].quantity !== 0 &&
      parseFloat(wallet.quantity) <= parseFloat(existeWallet[0].quantity)
    ) {
      let body: Object = {
        crypto: modalName.toLowerCase(),
        user: user._id ? user._id : user[0]._id,
        quantity:
          parseFloat(
            existeWallet.quantity
              ? existeWallet.quantity
              : existeWallet[0].quantity
          ) - parseInt(wallet.quantity),
        history: {
          date: wallet.date,
          quantity:
            parseFloat(
              existeWallet.quantity
                ? existeWallet.quantity
                : existeWallet[0].quantity
            ) - parseFloat(wallet.quantity),
        },
      };
      await axios
        .put("/wallet/restar/" + existeWallet[0]._id, body)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Transaction send ",
            confirmButtonText: "Ok!",
          });
        });

      await close(e);
      setWallet({
        date: new Date(Date.now()),
        quantity: "1",
        precio: 0,
        recibido: 0,
      });
      return;
    }
    Swal.fire({
      icon: "error",
      title: "Error, sin saldo",
      confirmButtonText: "Ok!",
    });
    setWallet({
      date: new Date(Date.now()),
      quantity: "1",
      precio: 0,
      recibido: 0,
    });
    await close(e);
  };

  return (
    <div className={`${negativos.contenedor} ${open && negativos.open}`}>
      <form className={negativos.formulario}>
        <div className={negativos.divCambio}>
          <img
            src={swap}
            alt="cambiar"
            onClick={() => {
              if (cambio === false) {
                setWallet({ ...wallet, recibido: 0 });
              }
              setCambio(!cambio);
            }}
          />
          <label className={negativos.cambia}>
            Cambia a {cambio === false ? "Precio por moneda" : "Total recibido"}{" "}
          </label>
        </div>
        <div className={negativos.boxTexto}>
          <p>{cambio === false ? "Precio por moneda" : "Total recibido"}</p>
          <div className={negativos.info}>
            <input
              className={negativos.input}
              placeholder={
                cambio === false ? cambioWallet.precio : cambioWallet.recibido
              }
              type="number"
              name={cambio === false ? "precio" : "recibido"}
              onChange={handleOnChange}
            />
            <label>USD</label>
          </div>
        </div>

        <div className={negativos.boxTexto}>
          <p>Cantidad</p>
          <div className={negativos.info}>
            <input
              className={negativos.input}
              value={wallet.quantity}
              placeholder={(wallet.quantity ? wallet.quantity : 1).toString()}
              type="number"
              name="quantity"
              onChange={handleOnChange}
            />
            <label>{precioMoneda?.symbol.toUpperCase()} </label>
          </div>
          <div className={negativos.cantidad}>
            <div>
              <label onClick={minima}>Cant.min</label>
            </div>
            <div>
              <label onClick={maxima}>Cant.max</label>
            </div>
          </div>
        </div>

        <div className={negativos.boxTexto}>
          <p>{cambio === false ? "Total recibido" : "Precio por moneda"}</p>
          <div className={negativos.infoInvalido}>
            <input
              className={negativos.input}
              placeholder={
                cambio === false ? cambioWallet.recibido : cambioWallet.precio
              }
              type="number"
              disabled={true}
            />
            <label>USD</label>
          </div>
        </div>

        <div className={negativos.boxTexto}>
          <p>Fecha</p>
          <div className={negativos.info}>
            <Flatpickr
              className={negativos.date}
              value={wallet.date}
              onChange={([dates]) => {
                setWallet({ ...wallet, date: dates });
              }}
            />
          </div>
        </div>
        <div>
          <Button gradient onClick={(e) => enviar(e)}>
            Guardar
          </Button>
          <Button
            onClick={async (e) => {
              e.preventDefault();
              await close(e);
            }}
          >
            {" "}
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
