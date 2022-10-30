import { Router} from "express"
import {postMail} from "../../controllers/mailHandler"

const mailHandler : any=Router()

mailHandler.post("/",postMail)
export default mailHandler;