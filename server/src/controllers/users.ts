import { Response, Request } from 'express';
const user = require('../models/User');
import handleError from '../utils/handleError';
import { NextFunction } from 'express';
import activos from './../routes/middleware/activs';


const getUsers: any = async (req: Request, res: Response) => {

  try {
    const { id } = req.params;
    if (!id) {
      const userAll: Object = await user.find({});
      return res.status(202).json(userAll);
    } else {
      const userId: Object = await user.find({ _id: id });
      if (Object.keys(userId).length > 0) {
        return res.status(202).json(userId);
      }
      handleError(res, 'ERROR_GET_USERS_ID');
    }
  } catch (e) {
    handleError(res, 'ERROR_GET_USERS');
  }
};

const getUsersAdmin: any = async (req: Request, res: Response) => {

  try {
    const { id } = req.params;
    if (!id) {
      const userAll: Object = await user.find({ type: ['admin'] });
      return res.status(202).json(userAll);
    } else {
      const userId: Object = await user.find({ type: ['admin'], _id: id });
      if (Object.keys(userId).length > 0) {
        return res.status(202).json(userId);
      }
      handleError(res, 'ERROR_GET_USERS_ADMIN_ID');
    }
  } catch (e) {
    handleError(res, 'ERROR_GET_USERS_ADMIN');
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
    handleError(res, 'ERROR_POST_USERS');
  }
};


const deleteUsers: any = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await user.updateOne({ _id: id }, { activos: false });
    res.status(202).json('DELETE_EXIT');
  } catch (e) {
    handleError(res, 'ERROR_DELETE_USERS');
  }
};

const putUsers: any = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const userId: Object = await user.find({ activos: true, _id: id });
    if (Object.keys(userId).length > 0) {
      await user.updateOne({ _id: id }, body);
      return res.status(202).json('UPDATE_EXIT');
    }
    handleError(res, 'ERROR_UPDATE_USERS_ID');
  } catch (e) {
    handleError(res, 'ERROR_UPDATE_USERS');
  }
};

const updateUserAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { username, mail, name, lastname, activos } = req.body

    // const result = await cloudinary.uploader.upload(image, {
    //     //     //nombre del folder que se crea con las fotos, si no existe se crea automaticamente
    //     //     folder: patientPhotos,
    //     // })

    await user.findByIdAndUpdate(id, {
      username: username,
      mail: mail,
      // password: password,
      name: name,
      lastname: lastname,
      activos: activos,
    }, { new: true }) // este ultimo parámetro hace que nos devuelva el doc actualizado

      .then(() => {
        // console.log(updatedPatient)
        res.status(200).send("User Successfully Updated")
      })

  } catch (error) {
    console.error('Failed to update user');
    console.log(error)
    next(error)
  }
};
export { getUsers, postUsers, deleteUsers, putUsers, getUsersAdmin, updateUserAdmin };

