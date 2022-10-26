import { Router} from "express"
import {getReviews,postReview,deleteRewiew} from "../controllers/reviews"

const review : any=Router()

review.get("/",getReviews)
review.post("/",postReview)
review.delete("/:id",deleteRewiew) 

export default review;