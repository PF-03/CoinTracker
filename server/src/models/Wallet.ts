//MODELO PARA BILLETEREA 
import { Schema, model } from "mongoose";
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
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
        versionKey: false,
    });

const walletModel = model("Wallet", walletSchema);

export default walletModel;