import { Router } from 'express';

const exchange = Router();

import {
    getExchangeHistory,
    postExchangeHistory,
    updateExchangeHistory,
    deleteExchangeHistory
} from '../../controllers/exchangeHistory'

exchange.get('/', getExchangeHistory)

exchange.post('/', postExchangeHistory)

exchange.put('/', updateExchangeHistory)

exchange.delete('/', deleteExchangeHistory)


export default exchange;