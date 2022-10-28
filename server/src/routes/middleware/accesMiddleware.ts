import { Request, Response, NextFunction } from "express";
import userModel from "../../models/User";

interface user {
  username: string;
  pasword: string;
  mail: string;
  name: string;
  lastname: string;
  type: "admin" | "user";
  token: string;
  activos: boolean;
}

async function isUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { _id, username, password, mail, type, activos } = req.body;
    const data = {
      _id,
      username,
      password,
      mail,
      type,
      activos,
    };

    const exist = await userModel.find({ username: data.username });
    if (exist.length > 0) {
      next();
    } else {
      throw new Error("Acceso denegado");
    }
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}

async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, mail, name, lastname, type, token, activos } = req.body;
    const data = {
      username,
      mail,
      name,
      lastname,
      type,
      token,
      activos,
    };

    const exist = await userModel.find({ username: data.username });
    if (exist[0]?.type.includes("admin")) {
      next();
    } else {
      throw new Error("Acceso denegado");
    }
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}

export default { isAdmin, isUser };
