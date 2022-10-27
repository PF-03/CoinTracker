import { Router } from 'express';
import { filterActivos, getActivos } from "../../controllers/actives"

const activos = Router();

activos.get('/', async (_req, res) => {
    const activos = await getActivos();
    console.log(activos)
    res.send(activos);
})

activos.get('/:filter', async (req, res) => {
    const { filter } = req.params;
    const order = await filterActivos(filter);
    res.send(order)


})

export default activos;