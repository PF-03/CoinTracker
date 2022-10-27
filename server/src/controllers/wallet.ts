import { Response, Request } from "express";
import walletModel from "../models/Wallet";

const walletController = {
    getWallet: async (req: Request, res: Response) => {
        const { user } = req.params;

        try {
            const userWallet = await walletModel.find({user: user})

            res.send(userWallet)
        } catch(e: any) {
            res.status(404).send({msg: e.message})
        }

    },

    deleteWallet: async (req: Request, res: Response) => {
        const { user } = req.params;

        try {
            const messageDelete = await walletModel.updateOne({user: user}, {isDeleted: true})
    
            res.send(messageDelete)
        } catch(e: any) {
            res.status(500).send({msg: e.message})
        }
    }
}

export default walletController;