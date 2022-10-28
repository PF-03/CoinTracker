//Archivo para la conexion a la base de datos
require('dotenv').config();
const mongoose = require('mongoose');
//Aplicacion que nos sirve para esquematizar la base de datos, no funciona a nivel de DB sino de aplicación

export async function dbConn() {
<<<<<<< HEAD
  const DB_URI = process.env.DB_URI;
  const connectionString = DB_URI;
  // conexion a mongodb
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    //devuelve promesa
    .then(() => {
      console.log('Database connected to ATLAS');
    })
    .catch((err: any) => {
      console.error('Connection Error: ', err);
    });
}
=======
    const DB_URI = process.env.DB_URI;
    const connectionString = DB_URI;

    // conexion a mongodb
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        //devuelve promesa
        .then(() => {
            console.log('Database connected to ATLAS')
        }).catch((err: Error) => {
            console.error('Connection Error: ', err)
        })
};
>>>>>>> 03ae5284f3d5eb13509f421edcbd951b1b03c879
