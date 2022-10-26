import { check } from "express-validator"
import validateResults from "./handleValidator"
import { Response, Request } from "express";



const validateCreateUsers:any=[
check("username")
.exists()
.notEmpty()
.isLength({min:3, max:99}),
check("email")
.exists()
.notEmpty()
.isEmail(),
(req:Request,res:Response,next:any)=>{
    return validateResults(req,res,next)
}
]

export default validateCreateUsers