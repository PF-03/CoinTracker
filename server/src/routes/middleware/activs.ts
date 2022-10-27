import express from 'express';
import { filterActivos } from '../../controllers/filterActivos';
import { getActivos } from '../../controllers/getActivos';

const activos = express.Router();

 
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

    
})

activos.get('/:filter', async(req, res)=>{
    const {filter} = req.params;
    const order = await filterActivos(filter);
    res.send(order)


})

export default activos;