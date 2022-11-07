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
    },
    history:{
        type:Array,
        default:[
            {
                date:"2022-10-20",
                quantity:0.0001,
            },
            {
                date:"2022-10-24",
                quantity:0.123,
            },
            {
                date:"2022-10-23",
                quantity:0.1,
            },
            {
                date:"2022-10-26",
                quantity:0.5,
            },
        ]
    }
},
    {
        timestamps: true,
        versionKey: false,
    });

const walletModel = model("Wallet", walletSchema);

export default walletModel;