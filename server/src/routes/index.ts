
import { Router } from "express"
import user from "./middleware/users";
import activos from "./middleware/activs"
import review from './reviews';
import exchange from "./middleware/exchangeHistory";

const routers : any=Router()

// add exchange history routes

routers.use('/exchange', exchange)
routers.use("/users",user)
routers.use("/activos",activos)
routers.use("/review",review)

export default routers