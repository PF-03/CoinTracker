
import React from 'react';

function Paginado (activosPorPage:any, allactivos:any,paginado:any){

    const pageNumbers=[];
    for(let i = 1; i <=Math.ceil(allactivos/activosPorPage); i++){
        pageNumbers.push(i);
        console.log(i)
    }
    //console.log(pageNumbers)
    return (
        <div>
         <nav className="nav">
                {pageNumbers?.map((e:any) =>(
                
                    <button onClick={()=> paginado(e)} className="paginado" key={e}>{e}</button>
           
                ))}
            </nav>

        </div>

 
 )
}


export default Paginado;

