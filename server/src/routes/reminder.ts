import { Router } from 'express';
import {
  getReminders,
  addReminder,
  updateReminder,
  deleteReminder,
} from '../controllers/reminder';

const router = Router();

router.post('/getreminders', getReminders);
router.post('/', addReminder);
router.delete('/', deleteReminder);
router.put('/', updateReminder);

export default router;
