import { Router} from "express"
import {getUsers, postUsers, deleteUsers, putUsers } from "../../controllers/users"
import validateCreateUsers from "../../utils/validator"

const user : any=Router()

user.get("/",getUsers)
user.get("/:id",getUsers)
user.post("/",validateCreateUsers,postUsers)
user.delete("/:id",deleteUsers) 
user.put("/:id",validateCreateUsers,putUsers) 

export default user