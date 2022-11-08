import React from "react";
import styles from "./AssetsList.module.css";
import { setMyAssets } from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import numberFormat from "../../../utils/numberFormat.js";
import Transaccion from "../../transaccion/transaccion";

const AssetsList = ({ HandleTrClick, modal }) => {
  const dispatch = useDispatch<any>();
  const allAssets = useSelector((state: any) => state.allactivos);
  const myWallet = useSelector((state: any) => state.walletData);
  const curretPage = useSelector((state: any) => state.currentAssetView);
  const array = [];

  const filtro = myWallet.filter((el) =>
    allAssets.filter((al) => {
      if (el.name.toLowerCase() === al.name.toLowerCase()) {
        let moneda = {
          crypto: el.crypto,
          id: el.id,
          name: el.name,
          quantity: el.quantity,
          rank: el.rank,
          _id: el._id,
          current_price: al.current_price,
          symbol: al.symbol,
        };
        array.push(moneda);
        return moneda;
      }
    })
  );
  console.log(filtro);
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

  return (
    <div className={styles.assetsTableContainer}>
      <table>
        <thead className={styles.tHeaders}>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>24h</th>
            <th>USD$</th>
            <th className={styles.buttonTbHeader}></th>
          </tr>
        </thead>
        <tbody>
          {(curretPage == "myAssets" ? array : allAssets).map((el) => {
            return (
              <tr
                key={el.rank}
                className={`${styles.trespe} ${
                  curretPage == "myAssets" ? styles.trespeClick : ""
                }`}
              >
                <th onClick={() => HandleTrClick(el.id)}>{el.name}</th>
                <th>
                  {numberFormat(el.current_price, "standard", "decimal") +
                    " US$"}
                </th>
                <th className={styles.th24h}>5%</th>
                <th>
                  {curretPage == "myAssets" ? (
                    <div className={styles.usd}>
                      <label>
                        {numberFormat(
                          (el.quantity ? el.quantity : 0) * el.current_price,
                          "standard",
                          "decimal"
                        ) + " US$"}
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
                </th>
                <th>
                  {" "}
                  {curretPage == "myAssets" ? (
                    <button name={el.name} onClick={() => modal(el.name)}>
                      +
                    </button>
                  ) : (
                    <button name={el.name} onClick={() => modal(el.name)}>
                      O
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
