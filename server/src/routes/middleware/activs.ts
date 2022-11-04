import { Router } from 'express';
import {  getActivos, getActivosMayoresA, getMenoresA} from "../../controllers/actives"
import {cambio, getDivisas} from '../../controllers/divisas';

const activos = Router();



activos.get('/', async (req, res)=> {

    const {name} = req.query;
    const {maximo} = req.query;
    const {minimo} = req.query;
    const {divisas} = req.query;
    let activos_ = await getActivos();

    if(divisas && divisas!='USD'){
        const cotizacion = await cambio();
        
        var keysbyindex = Object.keys(cotizacion);
        var valor;
        for (var i=0; i<keysbyindex.length; i++){
            if(keysbyindex[i]==divisas){
                valor=cotizacion[keysbyindex[i]]
            }
        }
        for(let i =0; i<activos_.length;i++){
            activos_[i].current_price=activos_[i].current_price*valor;
            activos_[i].market_cap=activos_[i].market_cap*valor;
        }
         
    }

    if(name){

        let foundName = activos_?.filter((e:any)=>e.name.toLowerCase().includes(name.toString().toLowerCase()));
        foundName.length?
        activos_=foundName:
        console.log('error')

    }
    if(maximo){
    
        const menoresAmaximo= await getMenoresA(maximo,activos_);
        activos_=menoresAmaximo;
      
    }
    if(minimo){
        const mayoresAminimo= await getActivosMayoresA(minimo,activos_);
        activos_=mayoresAminimo;
    }
    
    res.send(activos_);
    //console.log(activos_)
    
   


})
activos.get('/cotizaciones', async (req,res)=>{
    const cotizaciones = await getDivisas();
    res.send(cotizaciones);

})



export default activos;