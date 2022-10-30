import React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameActivos } from "../../redux/actions/index";
import Button from '../styles/button'
import styles from './SearchBar.module.css'





function SearchBar() {
    const dispatch = useDispatch<any>();

    //const[name, setName] = useState("");
    //const[minimo, setMinimo]= useState("");

    function HandleInputChange(e: any) {
        e.preventDefault();
        //setName(e.target.value)
        const input = document.getElementById('minimo') as HTMLInputElement | null;
        const input_maximo = document.getElementById('maximo') as HTMLInputElement | null;
        dispatch(getNameActivos(e.target.value, input?.value, input_maximo?.value)) //para que busque mientras escribe
        //setName(e.target.value)
        //console.log(e.target.value)
        //console.log(name)
    }

    function HandleSumbit(e: any) {
        const input = document.getElementById('minimo') as HTMLInputElement | null;
        const inputbutton = document.getElementById('button') as HTMLInputElement | null;
        const input_maximo = document.getElementById('maximo') as HTMLInputElement | null;
        dispatch(getNameActivos(inputbutton?.value, input?.value, input_maximo?.value))
        //console.log(getNameActivos(name))
    }





    return (
        <div>
            <div className={styles.containerSearch}>
                <input
                    className={styles.inputSearch}
                    type="text"
                    placeholder='Search active...'
                    onChange={(e: any) => HandleInputChange(e)}
                    id='button'
                />

                <div>
                    <Button className={styles.buttonSearch} onClick={(e: any) => HandleSumbit(e)}>
                        Search
                    </Button>
                </div>
            </div>

            <div className={styles.container}>
                <input
                    className={styles.inputPrecios}
                    type="number"
                    placeholder="Since.."
                    id='minimo'
                />
                <input
                    className={styles.inputPrecios}
                    type="number"
                    placeholder="Untill..."
                    id='maximo'
                />
            </div>
            <div className={styles.container}>
                <Button gradient className={styles.buttonFilter} type="submit" onClick={(e: any) => HandleSumbit(e)}>
                    Filter By Price
                </Button>
            </div>
        </div>




    )
}

export default SearchBar;