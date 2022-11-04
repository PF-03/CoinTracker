import React from "react";
import styles from "./AssetsList.module.css";
import { setMyAssets } from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
const AssetsList = ({HandleTrClick}) => {
  const dispatch = useDispatch<any>();
  const allAssets = useSelector((state: any) => state.allactivos);
  const myAssets = useSelector((state: any) => state.myAssets);
  const curretPage = useSelector((state: any) => state.currentAssetView);

  const HandleButtonsClick=(e)=>{
    if(curretPage==="allAssets"){
        var data = allAssets.filter(el=>{
            if(el.name===e.target.name)return true
        })[0]
        dispatch(setMyAssets(data))
    }
  }
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
          {(curretPage == "myAssets" ? myAssets : allAssets).map((el) => {
            return (
              <tr
                onClick={()=>HandleTrClick(el.id)}
                key={el.rank}
                className={`${styles.trespe} ${
                  curretPage == "myAssets" ? styles.trespeClick : ""
                }`}
              >
                <th>{el.name}</th>
                <th>{el.current_price + " US$"}</th>
                <th className={styles.th24h}>5%</th>
                <th>0.000 USD</th>
                <th>
                  {" "}
                  <button name={el.name}onClick={HandleButtonsClick}>{curretPage == "myAssets" ? "+" : "O"}</button>
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
