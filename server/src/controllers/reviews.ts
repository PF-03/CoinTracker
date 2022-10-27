import { Response, Request } from "express";
import handleError from "../utils/handleError"
import review from "../models/Review"


const getReviews:any = async(req:Request, res:Response)=>{
    try{
        const {sort, filter}= req.body;
        const AllReviews:Object= await review.find();
        if(filter)
        if(sort)
        res.status(202).json(AllReviews);
    }
    catch(err){
        handleError(res,`ERROR_GET_REVIEWS : ${err}`)
    }
}

const postReview:any = async(req:Request, res:Response)=>{
    try{
        const data:Object = req.body;
        const createdReview:Object = review.create(data)
        res.status(202).json(createdReview)
    }
    catch(err){
        handleError(res,`ERROR_POST_REVIEW : ${err}`)
    }
}

const deleteRewiew:any = async(req:Request, res:Response)=>{
    try{
        const id= req.params;
        const deletedReview = await review.findByIdAndRemove(id)
        res.status(202).json(deletedReview)
    }
    catch(err){
        handleError(res,`ERROR_DELETE_REVIEW: ${err}`)
    }
}

export {getReviews,postReview,deleteRewiew}