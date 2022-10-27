import { Router } from 'express';

const exchange = Router();

import {
    getExchangeHistory,
    postExchangeHistory,
    deleteExchangeHistory
} from '../../controllers/exchangeHistory'

exchange.get('/', getExchangeHistory)

exchange.post('/', postExchangeHistory)

exchange.delete('/', deleteExchangeHistory)


export default exchange;