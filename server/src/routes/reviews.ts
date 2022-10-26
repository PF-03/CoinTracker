import { Router} from "express"
import {getReviews,postReview,deleteRewiew} from "../controllers/reviews"

const router : any=Router()

router.get("/review",getReviews)
router.post("/review",postReview)
router.delete("/:id",deleteRewiew) 

export default router