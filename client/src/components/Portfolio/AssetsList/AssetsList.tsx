import { useState } from "react";
import styles from "./AssetsList.module.css";
import { alfabetico, getWalletData } from "../../../redux/actions";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import numberFormat from "../../../utils/numberFormat.js";
import hearth from "../../../assets/amor.png";
import az from "../../../assets/az.png";

const AssetsList = ({ HandleTrClick, modal }) => {
  const dispatch = useDispatch<any>();
  let allAssets = useSelector((state: any) => state.activos);
  let myWallet = useSelector((state: any) => state.walletData);
  let fav = useSelector((state: any) => state.favWallet);
  const curretPage = useSelector((state: any) => state.currentAssetView);
  const [ordenar, setOrdenar] = useState(false);
  const user = useSelector((state: any) => state.user);
  const [mayor, setMayor] = useState(false);
  const array = [];

  const filtro = myWallet.filter((el) =>
    allAssets?.filter((al) => {
      if (el.id.toLowerCase() === al.id.toLowerCase()) {
        let moneda = {
          crypto: el.crypto,
          id: el.id,
          name: al.name,
          quantity: el.quantity,
          rank: el.rank,
          _id: el._id,
          current_price: al.current_price,
          symbol: al.symbol,
          image: al.image,
          usd: numberFormat(
            (el.quantity ? el.quantity : 0) * al.current_price,
            "standard",
            "decimal"
          ),
        };
        array.push(moneda);
        return moneda;
      }
    })
  );
  console.log(array);

  const HandleButtonsClick = (e) => {
    e.preventDefault();
    if (curretPage === "allAssets") {
      var data = allAssets.filter((el) => {
        if (el.name === e.target.name) return true;
      })[0];
      let push = array.filter((el) => {
        if (el.id === data.id) {
          return el;
        }
      });
      if (push.length !== 0) return;

      return array.push(data);
    }
  };

  const ordenarAZ = async (e) => {
    e.preventDefault();
    setOrdenar(!ordenar);
    await dispatch(alfabetico(ordenar));
  };

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
      await axios.post("/wallet", fav);
    }
    await dispatch(getWalletData(user._id ? user._id : user[0]._id));
  };
  return (
    <div className={styles.assetsTableContainer}>
      <table className={styles.table}>
        <thead className={styles.tHeaders}>
          <tr>
            <th className={styles.tit} onClick={(e) => ordenarAZ(e)}>
              Name
            </th>
            <th>Price</th>
            <th>24h</th>
            <th>USD$</th>
          </tr>
        </thead>
        <tbody>
          {(curretPage == "myAssets" ? array : allAssets)?.map((el) => {
            return (
              <tr
                key={el.rank}
                className={`${styles.trespe} ${
                  curretPage == "myAssets" ? styles.trespeClick : ""
                }`}
              >
                <th
                  onClick={() => HandleTrClick(el.id)}
                  className={styles.imageTh}
                >
                  <img src={el.image} alt="" />
                  {el.name}
                </th>
                <th>
                  {numberFormat(el.current_price, "standard", "decimal") +
                    " US$"}
                </th>
                <th className={styles.th24h}>5%</th>
                <th className={styles.buttonTh}>
                  {curretPage == "myAssets" ? (
                    <div className={styles.usd}>
                      <label>
                        {`${el.usd} US$
                      `}
                      </label>
                      <label className={styles.quantity}>
                        {(el.quantity ? el.quantity : 0) +
                          " " +
                          el.symbol.toUpperCase()}
                      </label>
                    </div>
                  ) : (
                    "0.000 USD"
                  )}
                  {curretPage == "myAssets" ? (
                    <div>
                      <button
                        name={el.name}
                        onClick={(e) => modal(el.id, e, "mas")}
                      >
                        +
                      </button>
                      <button
                        name={el.name}
                        onClick={(e) => modal(el.id, e, "menos")}
                      >
                        -
                      </button>
                    </div>
                  ) : (
                    <button name={el.name} onClick={(e) => favorito(el, e)}>
                      <img src={hearth} alt="corazon" />
                    </button>
                  )}
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AssetsList;
