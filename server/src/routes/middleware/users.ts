import { Router } from "express";
import {
  getUsers,
  postUsers,
  deleteUsers,
  putUsers,
} from "../../controllers/users";
import validateCreateUsers from "../../utils/validator";
import acces from "./accesMiddleware";

const user: any = Router();

user.get("/", acces.isAdmin, getUsers);
user.get("/:id", acces.isAdmin, getUsers);
user.post("/", validateCreateUsers, postUsers);
user.delete("/:id", acces.isAdmin, deleteUsers);
user.put("/:id", validateCreateUsers, putUsers);

export default user;
