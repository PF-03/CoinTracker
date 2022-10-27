import { Response, Request } from "express";
import user from "../models/User"
import handleError from "../utils/handleError"

const getUsers: any = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) {
            const userAll: Object = await user.find({ activos: true })
            res.status(202).json(userAll)
        }
        else {
            const userId: Object = await user.find({ _id: id })
            res.status(202).json(userId)
        }

    }
    catch (e) {
        handleError(res, "ERROR_GET_USERS")
    }
}


const postUsers: any = async (req: Request, res: Response) => {
    try {
        const body: object = req.body
        const userCreate = new user(body)
        await userCreate.save()
        res.status(202).json({ userCreate })
    }
    catch (e) {
        console.log(e)
        handleError(res, "ERROR_POST_USERS")
    }
}

const deleteUsers: any = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await user.updateOne({ _id: id }, { activos: false })
        res.status(202).json("DELETE_SUCCESSFUL")
    }
    catch (e) {
        handleError(res, "ERROR_DELETE_USERS")
    }

}

const putUsers: any = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body = req.body
        await user.updateOne({ _id: id }, body)
        res.status(202).json("UPDATE_SUCCESSFUL")
    }
    catch (e) {
        handleError(res, "ERROR_UPDATE_USERS")
    }
}



export { getUsers, postUsers, deleteUsers, putUsers }