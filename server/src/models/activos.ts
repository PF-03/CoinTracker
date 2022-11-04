import { Schema, model } from "mongoose";

const activosSchema = new Schema({
    hora: {
        type: String,
    },
    fecha:{
        type: String,
    },
    activos: {
        type: Array,
    }  
},
    {
        timestamps: true,
        versionKey: false,
    });

const newstModel = model("Activos", activosSchema);

export default newstModel;