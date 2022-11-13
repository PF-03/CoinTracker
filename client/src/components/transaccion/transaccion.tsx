import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import diseño from "./transaccion.module.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";
import swap from "../../assets/iconSwap.png";
import Button from "../styles/button";
import axios from "axios";
import Swal from "sweetalert2";
export default function Transaccion({ isOpen, close }) {
  const myWallet = useSelector((state: any) => state.walletData);
  const allAssets = useSelector((state: any) => state.allactivos);
  const modalName = useSelector((state: any) => state.nameTransaccion);
  const user = useSelector((state: any) => state.user);

  const precioMoneda = allAssets.filter(
    (el: any) => el.id.toLowerCase() === modalName.toLowerCase()
  )[0];
  const existeWallet = myWallet.filter(
    (el: any) => el.name.toLowerCase() === modalName.toLowerCase()
  );

  let precio = precioMoneda?.current_price;

  const dispatch: any = useDispatch();
  const [cambio, setCambio] = useState(false);
  const [wallet, setWallet] = useState({
    date: new Date(Date.now()),
    quantity: "1",
    precio: precio,
    gastado: "",
  });

  let gastado2 = wallet.gastado
    ? parseFloat(wallet.gastado)
    : parseFloat(wallet.precio ? wallet.precio : precio);

  const cambioWallet = {
    date: wallet.date,
    quantity: wallet.quantity,
    precio:
      cambio === false
        ? wallet.precio
          ? wallet.precio
          : precio
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
  let enviarr = async (body: any) => {
    try {
      await axios.post("/wallet", body).then(() => {
        Swal.fire({
          icon: "success",
          title: "Transaction send ",
          confirmButtonText: "Ok!",
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existeWallet.length === 0) {
      let body = {
        crypto: modalName.toLowerCase(),
        user: user._id ? user._id : user[0]._id,
        quantity: parseFloat(wallet.quantity),
        history: [
          {
            date: wallet.date,
            quantity: parseFloat(wallet.quantity),
          },
        ],
      };
      await enviarr(body);
      await close(e);
    } else {
      let body = {
        crypto: modalName.toLowerCase(),
        user: user._id ? user._id : user[0]._id,
        quantity:
          parseFloat(wallet.quantity) +
          parseFloat(
            existeWallet.quantity
              ? existeWallet.quantity
              : existeWallet[0].quantity
          ),
        history: {
          date: wallet.date,
          quantity:
            parseFloat(wallet.quantity) +
            parseFloat(
              existeWallet.quantity
                ? existeWallet.quantity
                : existeWallet[0].quantity
            ),
        },
      };
      await axios
        .put(
          "/wallet/" +
            (existeWallet[0]._id ? existeWallet[0]._id : existeWallet._id),
          body
        )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Transaction send ",
            confirmButtonText: "Ok!",
          });
        });
      await close(e);
    }
  };

  return (
    <div className={`${diseño.contenedor} ${isOpen && diseño.open}`}>
      <form className={diseño.formulario}>
        <div className={diseño.divCambio}>
          <img src={swap} alt="cambiar" onClick={cambios} />
          <label className={diseño.cambia}>
            Cambia a {cambio === false ? "Precio por moneda" : "Total gastado"}{" "}
          </label>
        </div>
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
            <label>{precioMoneda?.symbol.toUpperCase()}</label>
          </div>
        </div>

        <div className={diseño.boxTexto}>
          <p>{cambio === false ? "Total gastado" : "Precio por moneda"}</p>
          <div className={diseño.infoInvalido}>
            <input
              className={diseño.input}
              placeholder={
                cambio === false ? cambioWallet.gastado : cambioWallet.precio
              }
              type="number"
              disabled={true}
            />
            <label>USD</label>
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
        <div>
          <Button gradient onClick={(e) => handleSubmit(e)}>
            Guardar
          </Button>
          <Button
            onClick={async (e) => {
              e.preventDefault();
              await close(e);
            }}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
