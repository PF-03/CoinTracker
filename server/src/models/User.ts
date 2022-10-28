//MODELO DOCTOR
//Utilizando los esquemas creamos los modelos
<<<<<<< HEAD
const { Schema, model } = require('mongoose');
=======
import { Schema, model } from "mongoose";
>>>>>>> 03ae5284f3d5eb13509f421edcbd951b1b03c879

//Libreria para encriptar la password
const bcrypt = require('bcryptjs');

//Mongo da una id predeterminadamente, no es necesario declarar
const userSchema = new Schema(
  {
    googleId: {
      type: String,
    },
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
      type: String,
    },
<<<<<<< HEAD
    type: [
      {
        ref: 'Role',
        type: Schema.Types.ObjectId,
      },
    ],
=======
    type: {
        type:["admin","user"],
        default:"user"
    },
>>>>>>> 03ae5284f3d5eb13509f421edcbd951b1b03c879
    //CLOUDINARY
    // image: {
    //     type: String
    // },
    token: {
<<<<<<< HEAD
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
=======
        type: String
    },
    activos:{
        type:Boolean,
        default:true
    }
},
    {
        timestamps: true,
        versionKey: false,
    });
>>>>>>> 03ae5284f3d5eb13509f421edcbd951b1b03c879

//Metodos del modelo
userSchema.statics.encryptPassword = async (password: any) => {
  //Un salt es un string que hace que el hash sea inpredecible
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (
  password: any,
  receivedPassword: any
) => {
  return await bcrypt.compare(password, receivedPassword);
};

const userModel = model('User', userSchema);

export default userModel;
