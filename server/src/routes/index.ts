
import express from 'express';
import  getActivos  from "../routes/routeGetActivos";
import filterActivos  from '../routes/routeFilterActivos';


const router = express.Router();

router.use('/activos', getActivos);
router.use('/:filter', filterActivos);

export default router;


