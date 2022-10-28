import { Schema, model } from "mongoose";

const newsSchema = new Schema({
    fecha: {
        type: String,
    },
    new: {
        type: Array,
    }  
},
    {
        timestamps: true,
        versionKey: false,
    });

const newstModel = model("News", newsSchema);

export default newstModel;