import { Router } from "express";
import {
  getExchangeHistory,
  postExchangeHistory,
  updateExchangeHistory,
  deleteExchangeHistory,
} from "../../controllers/exchangeHistory";
import acces from "./accesMiddleware";

const exchange = Router();

exchange.use(acces.isUser);

exchange.get("/", getExchangeHistory);

exchange.post("/", postExchangeHistory);

exchange.put("/", updateExchangeHistory);

exchange.delete("/", deleteExchangeHistory);

export default exchange;
