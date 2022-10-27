import express from 'express';
import walletController from '../controllers/wallet';

const walletRouter = express.Router()

walletRouter.get('/:user', walletController.getWallet)

walletRouter.delete('/:user', walletController.deleteWallet)

wallet.put("/:id", walletController.putWallet)

export default walletRouter;

