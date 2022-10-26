import { validationResult } from "express-validator"
import { Response, Request } from "express";

const validateResults:any=(req:Request,res:Response,next:any)=>{
    try{
        validationResult(req).throw();
        return next() //continua hacie el controlador
    } catch(err:any){
        res.status(403);
        res.send(err.array());

    }
} 
export default validateResults