import { Response, Request } from "express";
import walletModel from "../models/Wallet";
import handleError from "../utils/handleError"

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
    },
    
    putWallet: async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { crypto, quantity } = req.body

        await wallet.findByIdAndUpdate(id, {
            crypto: crypto,
            quantity: quantity,
        }, { new: true }) // este ultimo parámetro hace que nos devuelva la wallet actualizada
            .then(() => {
                res.status(200).send("Wallet Successfully Updated")
            })

    } catch (e) {
        handleError(res, "ERROR_UPDATE_WALLET")
    }
}
}

export default walletController;




