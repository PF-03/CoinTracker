//MODELO PARA BILLETEREA 

//Mongo da una id predeterminadamente, no es necesario declarar
const walletSchema = new Schema({
    crypto: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    user: {
        type: String,
    },
},
    {
        timestamps: true,
        versionKey: false,
    });

const walletModel = model("Wallet", walletSchema);

module.exports = walletModel;