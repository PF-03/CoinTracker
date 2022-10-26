//MODELO PARA HISTORIAL DE INTERCAMBIOS

//Mongo da una id predeterminadamente, no es necesario declarar
const exchangeHistorySchema = new Schema({
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
        type: Date
    },
    username: {
        type: String,
    },
},
    {
        timestamps: true,
        versionKey: false,
    });

const exchangeHistoryModel = model("ExchangeHistory", exchangeHistorySchema);

module.exports = exchangeHistoryModel;
