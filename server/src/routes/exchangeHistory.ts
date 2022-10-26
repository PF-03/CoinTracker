const { Router } = require('express');

const router = Router();

const {
    getExchangeHistory,
    postExchangeHistory,
    updateExchangeHistory,
    deleteExchangeHistory
} = require('../controllers/exchangeHistory.ts')

router.get('/', getExchangeHistory)

router.post('/', postExchangeHistory)

router.put('/', updateExchangeHistory)

router.delete('/', deleteExchangeHistory)


module.exports = router;