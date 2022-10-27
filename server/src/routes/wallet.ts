import { Router } from "express"
import { putWallet } from "../controllers/wallet"

const wallet: any = Router()

wallet.put("/:id", putWallet)

export default wallet