import { Response, Request } from "express";
import walletModel from "../models/Wallet";
import handleError from "../utils/handleError"

const walletController = {
    getWallet: async (req: Request, res: Response) => {
        const { user } = req.params;
        const {cryptoId} = req.query;

        try {
            var walletData;
            if(cryptoId){
                walletData = await walletModel.find({crypto:cryptoId})
            }else{
                walletData = await walletModel.find({user: user})
            }

            res.send(walletData)
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
        const { crypto, quantity, history} = req.body
        await walletModel.findByIdAndUpdate(id, {
            crypto: crypto,
            quantity: quantity,
/*             history: */
        }, { new: true }) // este ultimo parámetro hace que nos devuelva la wallet actualizada
            .then(() => {
                res.status(200).send("Wallet Successfully Updated")
            })

    } catch (e) {
        handleError(res, "ERROR_UPDATE_WALLET")
    }
},
    postWallet: async (req: Request, res: Response) => {
    try {
      const body: object = req.body;
      const userCreate = new walletModel(body);
      await userCreate.save();
      res.status(202).json({ userCreate });
    } catch (e) {
      console.log(e);
      handleError(res, 'ERROR_POST_USERS');
    }
  }
  
}

export default walletController;




