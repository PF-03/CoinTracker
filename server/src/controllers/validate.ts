// import { NextFunction } from "express";
// import { idText } from "typescript";
import { Response, Request } from "express";
const user = require("../models/User");

export async function isAdmin(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const exist: any = await user.find({ _id: id });
    if (exist[0]?.type?.includes("admin")) {
      res.status(200).send({ value: true });
    } else {
      res.status(200).send({ value: false });
    }
  } catch (e: any) {
    res.status(404).send({ msg: e.message });
  }
}

