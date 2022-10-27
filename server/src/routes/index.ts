import { Router } from "express"
import user from "./middleware/users";
import activos from "./middleware/activs"
import review from './middleware/reviews';
import exchange from "./middleware/exchangeHistory";
import wallet from "./wallet"
import news from "./middleware/news";

const routers: any = Router()

// add exchange history routes

routers.use('/exchange', exchange)
routers.use("/users", user)
routers.use("/activos", activos)
routers.use("/review", review)
routers.use("/wallet", wallet)
routers.use("/news", news)

export default routers