import { Schema, model } from "mongoose";

const cotizacionesSchema = new Schema({
    dia: {
        type: Number,
    },
    datos: {
        type: Object,
    }  
},
    {
        timestamps: true,
        versionKey: false,
    });

const newstModel = model("Cotizaciones", cotizacionesSchema);

export default newstModel;