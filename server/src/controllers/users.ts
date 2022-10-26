import { Response, Request } from "express";
import user from "../models/User"
import handleError from "../utils/handleError"

const getUsers:any=async(req:Request, res:Response)=>{
try{
    const userAll:Object= await user.find({activo:true})
    res.status(202).json(userAll)
}
catch(e){
    handleError(res,"ERROR_GET_USERS")
}}


const postUsers:any=async(req:Request, res:Response)=>{
    try{
        const body:object=req.body
        const userCreate:Object= await user.create(body)
        res.status(202).json({userCreate})
    }
    catch(e){
        handleError(res,"ERROR_POST_USERS")
    }}

  const deleteUsers:any=async(req:Request, res:Response)=>{
         try{
            const { id } =req.params;
            const userDelete:any=await user.updateOne({_id:id},{activo:false})
            res.status(202).json("DELETE_EXIT")
          
        }
        catch(e){
            handleError(res,"ERROR_DELETE_USERS")
        }}  
    
    const putUsers:any=async(req:Request, res:Response)=>{
        try{
            const { id,...body } =req.params;
            const userCreate:any=await user.updateOne({_id:id},body)
            res.status(202).json("UPDATE_EXIT")
          }
        catch(e){
            handleError(res,"ERROR_UPDATE_USERS")
        }}
 


export {getUsers, postUsers, deleteUsers, putUsers }