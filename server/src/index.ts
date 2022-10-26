//Archivo que arranca el servidor 
import "dotenv/config"
import express, {Request, Response} from "express";
 import router from "./routes/index"; 
 import db from "./config/mongo"




//morgan permite ver las peticiones en consola
 import morgan from "morgan"; 

//cors permite comunicar el servidor y el frontend 
import cors from "cors";
const app: any = express();

app.use(express.json()) 
app.use(morgan('dev')) 
app.use(cors())

app.use("/",router)  


// Error catching endware.
 app.use((error: Error, req: Request, res: Response, next: any)=> {
    console.log(error)
    const name = error.name
    const message = error.message;
    // console.error(error);
    return res.send(name + message);
});  
 db().then(()=>console.log("conexion readyS"))
const PORT =  3002
app.listen(PORT, () =>
{ // puerto 3001
    console.log('Server listening on port',PORT); // eslint-disable-line no-console
});

