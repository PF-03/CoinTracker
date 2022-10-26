import express from 'express';
import { filterActivos } from '../controllers/filterActivos';


const router = express.Router();

router.get('/:filter', async(req, res)=>{
    const {filter} = req.params;
    const order = await filterActivos(filter);
    res.send(order)


})

export default router;