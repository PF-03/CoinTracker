import { Router} from "express"
import {postMail, verifiqued } from "../../controllers/mailHandler1"

const mailHandler : any=Router()

mailHandler.post("/",postMail)
mailHandler.post("/verificar/:token",verifiqued)
export default mailHandler;