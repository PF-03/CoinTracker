import express from 'express';
import getActivos from '../routes/routeGetActivos';
import filterActivos from '../routes/routeFilterActivos';
import users from './users';
import localAuth from './localAuth';
import googleAuth from './googleAuth';

const router = express.Router();

router.use('/localauth', localAuth);
router.use('/googleauth', googleAuth);
router.use('/activos', getActivos);
router.use('/:filter', filterActivos);
router.use('/users', users);

export default router;
