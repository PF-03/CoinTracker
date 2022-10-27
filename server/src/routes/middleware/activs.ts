import { Router } from 'express';
import { filterActivos, getActivos } from "../../controllers/actives"

const activos = Router();

<<<<<<< HEAD
 
activos.get('/', async (req, res)=> {
    const {name} = req.query;
    const _activos = await getActivos();
    
    if(!name){
        res.send(_activos)
    }else{
        let foundName = _activos.filter((e:any) => e.name.toLowerCase().includes(name.toString().toLowerCase()));
        foundName.length ?
        res.status(200).send(foundName) :
        res.status(404).json({message:'Activo not found :('})
    }

    
=======
activos.get('/', async (_req, res) => {
    const activos = await getActivos();
    console.log(activos)
    res.send(activos);
>>>>>>> ada8489a5a62ed16f88bf8325afc743ff68ad9b2
})

activos.get('/:filter', async (req, res) => {
    const { filter } = req.params;
    const order = await filterActivos(filter);
    res.send(order)


})

export default activos;