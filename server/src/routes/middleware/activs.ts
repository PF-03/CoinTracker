import { Router } from 'express';
import { filterActivos, getActivos } from "../../controllers/actives"

const activos = Router();



activos.get('/', async (req, res)=> {

    const {name} = req.query;


    const activos_ = await getActivos();

    if(!name){
        res.send(activos_)
    }else{
        let foundName = activos_.filter((e:any)=>e.name.toLowerCase().includes(name.toString().toLowerCase()));
        foundName.length?
        res.send(foundName):
        res.json({message:'Activo not found'})
    }
    //console.log(activos_)
    //res.send(activos_);


})

activos.get('/:filter', async (req, res) => {
    const { filter } = req.params;
    const order = await filterActivos(filter);
    res.send(order)


})

export default activos;