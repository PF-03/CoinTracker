import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameActivos } from "../../redux/actions/index";
import Button from "../styles/button";
import styles from "./SearchBar.module.css";
import { getCotizaciones } from "../../redux/actions/index";

function SearchBar() {
  const dispatch = useDispatch<any>();

  //const[name, setName] = useState("");
  //const[minimo, setMinimo]= useState("");

  useEffect(() => {
    dispatch(getCotizaciones());
  }, [dispatch]);

  const pop: any = useSelector<any>((state) => state.cotizaciones);
  const cotizaciones = pop;
  const keys = Object.keys(cotizaciones);
  console.log(keys);

  function HandleInputChange(e: any) {
    e.preventDefault();
    //setName(e.target.value)
    const input = document.getElementById("minimo") as HTMLInputElement | null;
    const input_maximo = document.getElementById(
      "maximo"
    ) as HTMLInputElement | null;
    const input_select = document.getElementById(
      "selectCotizacion"
    ) as HTMLInputElement | null;
    dispatch(
      getNameActivos(
        e.target.value,
        input?.value,
        input_maximo?.value,
        input_select?.value
      )
    ); //para que busque mientras escribe
    //setName(e.target.value)
    //console.log(e.target.value)
    //console.log(name)
  }

  function HandleSumbit(e: any) {
    const input = document.getElementById("minimo") as HTMLInputElement | null;
    const inputbutton = document.getElementById(
      "button"
    ) as HTMLInputElement | null;
    const input_maximo = document.getElementById(
      "maximo"
    ) as HTMLInputElement | null;
    const input_select = document.getElementById(
      "selectCotizacion"
    ) as HTMLInputElement | null;
    dispatch(
      getNameActivos(
        inputbutton?.value,
        input?.value,
        input_maximo?.value,
        input_select?.value
      )
    );
    //console.log(getNameActivos(name))
  }

  return (
    <div>
      <div className={styles.containerSearch}>
        <div>
          <input
            className={styles.inputSearch}
            type="text"
            placeholder="Search active..."
            onChange={(e: any) => HandleInputChange(e)}
            id="button"
          />
          <Button
            className={styles.buttonSearch}
            onClick={(e: any) => HandleSumbit(e)}
          >
            Search
          </Button>
        </div>
        <div>
          <select
            id="selectCotizacion"
            onChange={(e: any) => HandleSumbit(e)}
            className={styles.selectDivisas}
          >
            <option>USD</option>
            {keys.length > 0 ? (
              keys.map((e: any, index) => {
                return <option key={index}>{e}</option>;
              })
            ) : (
              <option>API ERROR</option>
            )}
          </select>
        </div>
        <details className={styles.details}>
          <summary>Filters</summary>
          <div className={styles.containerFilters}>
            <div className={styles.container}>
              <input
                className={styles.inputPrecios}
                type="number"
                placeholder="Since.."
                id="minimo"
              />
              <input
                className={styles.inputPrecios}
                type="number"
                placeholder="Untill..."
                id="maximo"
              />
            </div>
            <div className={styles.container}>
              <Button
                gradient
                className={styles.buttonFilter}
                type="submit"
                onClick={(e: any) => HandleSumbit(e)}
              >
                Filter By Price
              </Button>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}

export default SearchBar;
