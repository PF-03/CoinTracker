import express from 'express';
import { getActivos } from '../controllers/getActivos';

const router = express.Router();

router.get('/activos', async (_req, res)=> {

    const activos = await getActivos();
    console.log(activos)
    res.send(activos);
})

export default router;