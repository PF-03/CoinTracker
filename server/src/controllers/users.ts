import { Response, Request } from "express";
import { use } from "passport";
const user = require("../models/User");
import handleError from "../utils/handleError";
import { NextFunction } from "express";
const cloudinary = require("cloudinary").v2;
const fs = require("fs-extra");
const { API_KEYCLOUDINARY, APISECRET_CLOUDINARY, CLOUDINARY_NAME } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: API_KEYCLOUDINARY,
  api_secret: APISECRET_CLOUDINARY,
});

const getUsers: any = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      let userAll: Object = await user.find({});
      return res.status(202).json(userAll);
    } else {
      const userId: Object = await user.find({ _id: id });
      if (Object.keys(userId).length > 0) {
        return res.status(202).json(userId);
      }
      handleError(res, "ERROR_GET_USERS_ID");
    }
  } catch (e) {
    handleError(res, "ERROR_GET_USERS");
  }
};

const getUsersAdmin: any = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      let userAllAdmins: Object = await user.find({ type: "admin" });
      return res.status(202).json(userAllAdmins);
    } else {
      const userId: Object = await user.find({ type: "admin", _id: id });
      if (Object.keys(userId).length > 0) {
        return res.status(202).json(userId);
      }
      handleError(res, "ERROR_GET_USERS_ADMIN_ID");
    }
  } catch (e) {
    handleError(res, "ERROR_GET_USERS_ADMIN");
  }
};

const postUsers: Function = async (req: Request, res: Response) => {
  try {
    const body: object = req.body;
    const userCreate = new user(body);
    await userCreate.save();
    res.status(202).json({ userCreate });
  } catch (e) {
    console.log(e);
    handleError(res, "ERROR_POST_USERS");
  }
};

const deleteUsers: any = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let userFound = {
      activos: true,
    };
    userFound = await user.findById({ _id: id });
    if (userFound.activos === true) {
      var userAct = await user.findByIdAndUpdate(
        id,
        { activos: false },
        { new: true }
      );
    } else {
      var userAct = await user.findByIdAndUpdate(
        id,
        { activos: true },
        { new: true }
      );
    }
    console.log(userAct.activos);
    res.status(202).json("DELETE_EXIT");
  } catch (e) {
    handleError(res, "ERROR_DELETE_USERS");
  }
};

const putUsers: any = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, name, mail, lastname } = req.body;
    const userId: Object = await user.find({ activos: true, _id: id });
    console.log(username, name, mail, lastname);
    if (Object.keys(userId).length > 0) {
      if (req.file) {
        const resultClou = await cloudinary.uploader.upload(req.file.path);
        await user.updateOne(
          { _id: id },
          {
            username,
            mail,
            lastname,
            name,
            image: {
              imageURL: resultClou.url,
              public_id: resultClou.public_id,
            },
          }
        );
        await fs.unlink(req.file.path);
        return res.status(202).json("UPDATE_EXIT");
      }
      await user.updateOne(
        { _id: id },
        {
          username,
          mail,
          lastname,
          name,
        }
      );
      return res.status(202).json("UPDATE_EXIT");
    }
    handleError(res, "ERROR_UPDATE_USERS_ID");
  } catch (e) {
    console.log(e);
    handleError(res, "ERROR_UPDATE_USERS");
  }
};

const updateUserAdmin: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { username, mail, name, lastname, activos } = req.body;
    await user
      .findByIdAndUpdate(
        id,
        {
          username: username,
          mail: mail,
          name: name,
          lastname: lastname,
          activos: activos,
        },
        { new: true }
      ) // este ultimo parámetro hace que nos devuelva el doc actualizado

      .then(() => {
        res.status(200).send("User Successfully Updated");
      });
  } catch (error) {
    console.error("Failed to update user");
    console.log(error);
    next(error);
  }
};

const putPassword: any = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { passwordActual, passwordNueva } = req.body;
    const usuario = await user.find({ _id: id });
    if (Object.keys(usuario).length > 0) {
      const validate = await user.comparePassword(
        passwordActual,
        usuario[0].password
      );
      if (validate) {
        await user.updateOne(
          { _id: id },
          {
            password: await user.encryptPassword(passwordNueva),
          }
        );
        return res.send("EXIT");
      }
      return res.status(400).send("PASSWORD INVALID");
    }
    return res.status(400).send("MAIL INVALID");
  } catch (e) {
    return res.status(400).send("ERROR");
  }
};
export {
  getUsers,
  postUsers,
  deleteUsers,
  putUsers,
  putPassword,
  getUsersAdmin,
  updateUserAdmin,
};
