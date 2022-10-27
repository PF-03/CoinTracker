import React from 'react';

function Paginado (activosPorPage:any, allactivos:any,paginado:any){

    const pageNumbers:Array<any> =[];
    for(let i = 1; i <=Math.ceil(allactivos/activosPorPage); i++){
        pageNumbers.push(i);
    }
    return (
        <div>HOLA
        
             {pageNumbers.map(number =>(
                <p>
                 <button onClick={()=> paginado(number)}  >{number}</button>
                </p>
             ))}
        </div>

 
 )
}


export default Paginado;

