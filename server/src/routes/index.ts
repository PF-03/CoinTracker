import { Router } from "express"
import router from "./users"

const routers : any=Router()

routers.use("/users",router)
/* router.use("/news",require("./news.ts")) */

export default routers