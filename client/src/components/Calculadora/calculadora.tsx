import React from 'react';
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivos} from "../../redux/actions/index";
import css from '../Calculadora/calculadora.module.css';



function Calculadora(){
    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(getActivos());
    }, [dispatch]);

    const pop: any = useSelector<any>((state) => state.allactivos);
    const currentActivos = pop;

    function HandleInputs(){
        const input_select = document.getElementById('select') as HTMLInputElement | null;
        const input_cantidad = document.getElementById('kantidad') as HTMLInputElement | null;
        const renderizado = document.getElementById('renderizado') as HTMLElement | null;
        renderizado.innerHTML='';

        currentActivos?
        currentActivos.map((e:any)=>{
              let result = calcular(e, input_select, input_cantidad);
              let child=document.createElement('tr')
              child.id=e.id
              child.innerHTML=
                `
                              
                                <td>
                                  <img src=${e.image} alt="" width="30px" height="30px" />
                                </td>
                                <td>
                                  ${e.name}
                                </td>
                                <td>
                                  ${result}
                                </td>
                           
                            
                  `
                renderizado.appendChild(child )
          }):
          console.log('error')
        

     
    }

    function calcular(monedamap:any, input_select:any, input_cantidad:any){
        //const input_select = document.getElementById('select') as HTMLInputElement | null;
        //const input_cantidad = document.getElementById('kantidad') as HTMLInputElement | null;
        const moneda = currentActivos.find((e:any)=> e.name === input_select.value);
        let cantidad = input_cantidad.value? input_cantidad.value:1
        //console.log(input_cantidad.value)
        const usd_total = moneda?.current_price * parseInt(cantidad);
        //console.log(usd_total)
        const result = usd_total/monedamap.current_price;
        //console.log(result)
        return result;
    }
   
   
    return(
        
        <div>
          <h1>Calculator</h1>
            <div className={css.selectYcantidad}>
            <select id='select' onChange={()=>HandleInputs()} >
                
          {
            currentActivos?
            currentActivos.map((e:any)=> {
                return(
                    <option value={e.name} key={e.id} >{e.name}</option>
                )
            }):
            console.log('currentActivos vacio')
          }
          </select>
          <input type="number" id='kantidad' placeholder='1' onChange={()=>HandleInputs()}
          min='0'/>
          </div>
          <div className={css.containerTableCalc}>     
          <table className={css.tableCalc}>
         <tbody id='renderizado'>
            {
                
                currentActivos?
                currentActivos.map((e:any)=>{
                        const input_select = document.getElementById('select') as HTMLInputElement | null;
                        const input_cantidad = document.getElementById('kantidad') as HTMLInputElement | null;
                        let result = calcular(e, input_select, input_cantidad);

                        return(
                            <tr key={e.id}>
                                <td>
                                  <img src={e.image} alt="" width="30px" height="30px" />
                                </td>
                                <td>
                                  {e.name}
                                </td>
                                <td>
                                  {result}
                                </td>
                            </tr>
                          )
          
                  }):
                  console.log('error')
            }

         </tbody>
         </table>
         </div>
         
        </div>
    )
}

export default Calculadora