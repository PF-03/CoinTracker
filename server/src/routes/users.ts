import { Router } from 'express';
import {
  getUsers,
  postUsers,
  deleteUsers,
  putUsers,
  getUsersAdmin,
} from '../controllers/users';
import validateCreateUsers from '../utils/validator';

const router: any = Router();

router.get('/', getUsers);
router.get('/admins', getUsersAdmin);
router.post('/', validateCreateUsers, postUsers);
router.delete('/:id', deleteUsers);
router.put('/:id', validateCreateUsers, putUsers);

export default router;
