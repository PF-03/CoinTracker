import { Router } from 'express';

const router = Router();

const {
    getExchangeHistory,
    postExchangeHistory,
    deleteExchangeHistory
} = require('../controllers/exchangeHistory.ts')

router.get('/', getExchangeHistory)

router.post('/', postExchangeHistory)

router.delete('/', deleteExchangeHistory)


module.exports = router;