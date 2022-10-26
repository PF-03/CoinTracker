//MODELO DOCTOR
//Utilizando los esquemas creamos los modelos
const { Schema, model } = require("mongoose");

//Libreria para encriptar la password
const bcrypt = require('bcryptjs')

//Mongo da una id predeterminadamente, no es necesario declarar
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    mail: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    lastname: {
        type: String
    },
    type: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }],
    //CLOUDINARY
    // image: {
    //     type: String
    // },
    token: {
        type: String
    }
},
    {
        timestamps: true,
        versionKey: false,
    });

//Metodos del modelo
userSchema.statics.encryptPassword = async (password) => {
    //Un salt es un string que hace que el hash sea inpredecible
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

const userModel = model("User", userSchema);

module.exports = userModel;
