

import express from 'express';
import  getActivos  from "../routes/routeGetActivos";
import filterActivos  from '../routes/routeFilterActivos';
import { Router } from "express"
import router from "./users"


const router = express.Router();

router.use('/activos', getActivos);
router.use('/:filter', filterActivos);
router.use("/users",router)

export default router;


