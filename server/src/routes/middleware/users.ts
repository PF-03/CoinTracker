import { Router } from "express";
import {
  getUsers,
  postUsers,
  deleteUsers,
  putUsers,
  updateUserAdmin,
  getUsersAdmin,
  putPassword,
} from "../../controllers/users";
import validateCreateUsers from "../../utils/validator";

const user: any = Router();

user.get("/", getUsers);
user.get("/admins", getUsersAdmin);
user.get("/:id", getUsers);
user.post("/", validateCreateUsers, postUsers);
user.delete("/:id", deleteUsers);
user.put("/:id", putUsers);
user.put("/admin/:id", updateUserAdmin);
user.put("/password/:id", putPassword);

export default user;
