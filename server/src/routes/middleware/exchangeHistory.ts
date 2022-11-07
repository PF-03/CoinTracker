import { Router } from 'express';
import {
  getExchangeHistory,
  postExchangeHistory,
  updateExchangeHistory,
  deleteExchangeHistory,
} from '../../controllers/exchangeHistory';

const exchange = Router();

exchange.post('/getExchange', getExchangeHistory);

exchange.post('/', postExchangeHistory);

exchange.put('/', updateExchangeHistory);

exchange.delete('/', deleteExchangeHistory);

export default exchange;
