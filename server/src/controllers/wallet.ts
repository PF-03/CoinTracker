import { Response, Request } from "express";
import wallet from "../models/Wallet"
import handleError from "../utils/handleError"

export const putWallet: any = async (req: Request, res: Response) => {
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