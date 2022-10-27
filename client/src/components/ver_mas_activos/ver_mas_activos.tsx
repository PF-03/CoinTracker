import React from 'react';
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivos } from "../../redux/actions/index";
import Paginado from './Paginado';

import SearchBar from '../SearchBar/SearchBar';


function Activos(){

    const dispatch =useDispatch<any>();
    //const allactivos= useSelector((state)=>state.activos)
    const allactivos:any = useSelector<any>((state) => state.activos);

    const [currentPage, setCurrentPage] = useState(1); //--> porque empieza en pag 1 siempre
    const [activosPorPage, setActivosPorPage] = useState(9);
    const indexLastActivo = currentPage * activosPorPage;
    const indexFirstActivo = indexLastActivo - activosPorPage;
    const currentActivos  = allactivos.slice(indexFirstActivo, indexLastActivo);
    const [orden, setOrden] = useState('');

    const paginado = (pageNumber:any)=>{
        setCurrentPage(pageNumber)
    }

    useEffect (()=>{
        dispatch(getActivos())
    },[dispatch]) 

    return(
        <div>
            
            <Paginado
            activosPorPage={activosPorPage}
            allactivos={allactivos.length}
            paginado={paginado}
            />
            
            <SearchBar/>
            <div>
                {
                    currentActivos.length>0?
                    currentActivos.map((e:any)=>{
                        return(
                            <div key={e.id}>
                            <p>{e.name}</p>
                            <img src={e.image} alt=''/>
                            <p>${e.current_price}</p>
                            <p>${e.market_cap}</p>
                        </div>
                        )
                    }):
                    
                    <img src="https://thumbs.gfycat.com/DeliriousSeveralAsianelephant-size_restricted.gif"></img>
                }

            </div>
        </div>
    )



    
}


export default Activos;