import { Router } from 'express';
import { filterActivos, getActivos, getActivosMayoresA, getMenoresA} from "../../controllers/actives"

const activos = Router();



activos.get('/', async (req, res)=> {

    const {name} = req.query;
    const {maximo} = req.query;
    const {minimo} = req.query;
    let activos_ = await getActivos();


    if(name){
       
            let foundName = activos_?.filter((e:any)=>e.name.toLowerCase().includes(name.toString().toLowerCase()));
            foundName.length?
            activos_=foundName:
            //res.json({message:'active not found'})
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

activos.get('/:filter', async (req, res) => {
    const { filter } = req.params;
    const order = await filterActivos(filter);
    res.send(order)


})



export default activos;