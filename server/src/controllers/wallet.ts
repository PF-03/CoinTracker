import { Response, Request } from "express";
import { BSONSymbol } from "mongodb";
import { idText } from "typescript";
import walletModel from "../models/Wallet";
import handleError from "../utils/handleError";

const walletController = {
  getWallet: async (req: Request, res: Response) => {
    const { user } = req.params;
    const { id, showDeleted } = req.query;
    if (!showDeleted)
      return res.status(404).send("falta el parametro showDeleted");
    if (!user) return res.status(404).send("falta el parametro user");
    try {
      var walletData;
      if (id) {
        walletData = await walletModel.find({ _id: id });
      } else {
        walletData = await walletModel.find({
          user: user,
          isDeleted: showDeleted,
        });
      }
      res.send(walletData);
    } catch (e: any) {
      res.status(404).send({ msg: e.message });
    }
  },

  deleteWallet: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const messageDelete = await walletModel.updateOne(
        { _id: id },
        { isDeleted: true }
      );

      res.send(messageDelete);
    } catch (e: any) {
      res.status(500).send({ msg: e.message });
    }
  },
  restoreWallet: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const messageRestored = await walletModel.updateOne(
        { _id: id },
        { isDeleted: false }
      );

      res.send(messageRestored);
    } catch (e: any) {
      res.status(500).send({ msg: e.message });
    }
  },

  putWallet: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const body = req.body;
      if (!id) return res.status(404).send("falta el parametro id");
      if (body.crypto === undefined)
        return res.status(404).send("falta el parametro crypto");
      if (body.quantity === undefined)
        return res.status(404).send("falta el parametro quantity");
      console.log(body);
      const walletData: any = (await walletModel.find({ _id: id }))[0];
      (body.history = {
        date: new Date(Date.now()),
        quantity: body.quantity,
      }),
        await walletModel
          .findByIdAndUpdate(
            id,
            {
              crypto: body.crypto,
              quantity: body.quantity,
              history: [...walletData.history, body.history],
            },
            { new: true }
          ) // este ultimo parámetro hace que nos devuelva la wallet actualizada
          .then(() => {
            res.status(200).send("Wallet Successfully Updated");
          });
    } catch (e) {
      handleError(res, `ERROR_UPDATE_WALLET :${e}`);
    }
  },
  postWallet: async (req: Request, res: Response) => {
    try {
      var body: any = req.body;
      if (!body.crypto)
        return res.status(404).send("falta el parametro crypto");
      if (body.quantity === undefined)
        return res.status(404).send("falta el parametro quantity");
      if (!body.user) return res.status(404).send("falta el parametro user");

      body.history = [
        {
          date: new Date(Date.now()),
          quantity: body.quantity,
        },
      ];
      const walletCreate = new walletModel(body);
      await walletCreate.save();
      res.status(202).json({ walletCreate });
    } catch (e) {
      console.log(e);
      handleError(res, "ERROR_POST_USERS");
    }
  },
};

export default walletController;
