import express from 'express';
import walletController from '../controllers/wallet';

const walletRouter = express.Router()

walletRouter.get('/:user', walletController.getWallet)

walletRouter.delete('/:id', walletController.deleteWallet)

walletRouter.put("/:id", walletController.putWallet)

walletRouter.put("/rest/:id",walletController.restoreWallet)

walletRouter.post("/", walletController.postWallet)

export default walletRouter;

