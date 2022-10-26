

import express from 'express';
import  getActivos  from "../routes/routeGetActivos";
import filterActivos  from '../routes/routeFilterActivos';
import review from './reviews';
import router from "./users"


const routers = express.Router();

router.use('/activos', getActivos);
router.use('/:filter', filterActivos);
router.use("/users",router)
routers.use("/review",review)

export default router;


