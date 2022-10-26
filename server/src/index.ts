

//Archivo que arranca el servidor 
require("dotenv").config();


const express = require('express');
//import express from 'express';

const morgan = require('morgan');
//morgan permite ver las peticiones en consola

const cors = require('cors');


//cors permite comunicar el servidor y el frontend 



const app = express();

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
// Error catching endware.
import router from './routes/routeGetActivos';
app.use('/', router)



app.use((error:any, _req:any, res:any, _next:any) => {
    console.log(error)
    const name = error.name
    const message = error.message;
    // console.error(error);
    res.status(400).send(name + message);
});



const PORT = process.env.PORT || 3001
app.listen(PORT, () =>
{ // puerto 3001
    console.log('Server listening on port 3001'); // eslint-disable-line no-console
});
