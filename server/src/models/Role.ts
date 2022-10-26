//MODELO PARA ROLES

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

module.exports = roleModel;