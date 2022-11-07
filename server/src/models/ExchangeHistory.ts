//MODELO PARA HISTORIAL DE INTERCAMBIOS
import mongoose from 'mongoose';
const { model, Schema } = mongoose;

//Mongo da una id predeterminadamente, no es necesario declarar
const exchangeHistorySchema = new Schema(
  {
    icon1: {
      type: String,
    },
    icon2: {
      type: String,
    },
    crypto1: {
      type: String,
    },
    crypto2: {
      type: String,
    },
    quantity1: {
      type: Number,
    },
    quantity2: {
      type: Number,
    },
    price1: {
      type: Number,
    },
    price2: {
      type: Number,
    },
    date: {
      type: Date,
    },
    username: {
      type: String,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const ExchangeHistoryModel = model('ExchangeHistory', exchangeHistorySchema);

module.exports = ExchangeHistoryModel;
