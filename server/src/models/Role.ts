//MODELO PARA ROLES
import { Schema, model } from "mongoose";

const roleSchema = new Schema({
    name: {
        type: String,
    },
},
    {
        versionKey: false,
    },
);

const roleModel = model("Role", roleSchema);

export default roleModel;