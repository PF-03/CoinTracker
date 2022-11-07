//MODELO PARA REGISTRO DE DONACIONES
import mongoose from "mongoose";
const { model, Schema } = mongoose

//Mongo da una id predeterminadamente, no es necesario declarar
const donationSchema = new Schema({
    username: {
        type: String,
    },
    mail: {
        type: String,
    },
    amount: {
        type: Number,
    },
    date: {
        type: Date
    },
},
    {
        timestamps: false,
        versionKey: false,
    });

const DonationModel = model("Donations", donationSchema);

module.exports = DonationModel;
