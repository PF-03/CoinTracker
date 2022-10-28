import { Router } from "express";
import {
  getReviews,
  postReview,
  deleteRewiew,
} from "../../controllers/reviews";
import acces from "./accesMiddleware";

const review: any = Router();

review.use(acces.isUser);

review.get("/", getReviews);
review.post("/", postReview);
review.delete("/:id", deleteRewiew);

export default review;
