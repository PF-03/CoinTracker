import { Router } from "express";
import { isAdmin } from "../controllers/validate";

const validate: Router = Router();

validate.get("/:id", isAdmin);

export default validate;
