import { Router} from "express"
import {getUsers, postUsers, deleteUsers, putUsers } from "../controllers/users"
import validateCreateUsers from "../utils/validator"

const router : any=Router()

router.get("/",getUsers)
router.post("/",validateCreateUsers,postUsers)
router.delete("/:id",deleteUsers) 
router.put("/:id",validateCreateUsers,putUsers) 

export default router