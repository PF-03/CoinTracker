import axios from "axios"
import { Router, Request, Response } from "express"
import handleError from "../../utils/handleError"
const user=require("../../models/User")
const verifiqued: any = Router()


verifiqued.get("/:id",async(req:Request,res:Response)=>{
    const { id }=req.params
    console.log(id)
    
    try{

        let userVer=await user.find({_id:id})
        console.log(userVer)
            if(Object.keys(userVer).length>0){
                await user.updateOne({_id:id},{
                    status:"VERIFICADO"
                })
                return res.json("VERIFICADO")
            }
            handleError(res,"ERROR_VERIQUED_USER")
    
    }
    catch(e){
        handleError(res,"ERROR_VERIQUED_USER")

    }

})

export default verifiqued