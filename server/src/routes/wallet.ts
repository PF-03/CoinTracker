import express from "express";
import walletController from "../controllers/wallet";
import acces from "./middleware/accesMiddleware";

const walletRouter = express.Router();

walletRouter.use(acces.isUser);

walletRouter.get("/:user", walletController.getWallet);

walletRouter.delete("/:user", walletController.deleteWallet);

walletRouter.put("/:id", walletController.putWallet);

export default walletRouter;
