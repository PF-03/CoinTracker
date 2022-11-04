import { style } from "@vanilla-extract/css";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivos } from "../../redux/actions/index";
import css from "../SearchBar/SearchBar.module.css";
import card from '../styles/styles.module.css'
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Bubble from "../styles/bubbles";
import numberFormat from "../../utils/numberFormat.js";

function Activos() {
  const dispatch = useDispatch<any>();
  //const allactivos= useSelector((state)=>state.activos)
  const allactivos: any = useSelector<any>((state) => state.activos);

  const [currentPage, setCurrentPage] = useState(1); //--> porque empieza en pag 1 siempre
  const [activosPorPage, setActivosPorPage] = useState(9);
  //const indexLastActivo = currentPage * activosPorPage;
  //const indexFirstActivo = indexLastActivo - activosPorPage;
  const currentActivos = allactivos; //.slice(indexFirstActivo, indexLastActivo);
  const [orden, setOrden] = useState("");

  useEffect(() => {
    dispatch(getActivos());
    
  }, [dispatch]);

  const navigate = useNavigate();
  return (
    <div style={{position: 'relative'}}>
      <SearchBar />
      <Bubble size="small" left='-3rem' top='20%' />
      <div className={`${css.tableContainer} ${card.card}`}>
        <table>
          <tbody>
            <tr className={css.tHeaders}>
              <th><div>
                Name
              </div></th>
              <th>Price</th>
              <th>Market Capitalization</th>
            </tr>

            {currentActivos.length > 0 ? (
              currentActivos.map((e: any) => {
                const market_cap_legible=(numberFormat(e.market_cap,'standard','decimal'))
                const current_price_legible=(numberFormat(e.current_price,'standard','decimal'))
                const input_select= document.getElementById('selectCotizacion') as HTMLInputElement|null;
                return (
                  
                  <tr className={css.trespe} key={e.id}>
                    <td onClick={() => navigate(`/crypto/${e.id}`)}>
                        <div className={css.name}>
                          <img src={e.image} alt="" width="30px" height="30px" />
                          <span>{e.name}</span>
                        </div>
                    </td>
                    <td>{input_select?.value} {current_price_legible}</td>
                    <td>{input_select?.value} {market_cap_legible}</td>
                  </tr>
                );
              })
            ) : (
              <img src="https://cdn.iconscout.com/icon/free/png-256/404-page-not-found-456876.png"></img>
            )}
          </tbody>
        </table>
      </div>
      <Bubble color="blue-light" size="large" bottom='-50%' right='-20%'/>
    </div>
  );
}

export default Activos;
