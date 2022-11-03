import axios from "axios"
import { Router, Request, Response } from "express"
const user=require("../../models/User")
const verifiqued: any = Router()


verifiqued.get("/:token",async(req:Request,res:Response)=>{
    const { token }=req.params
    console.log(token)
    const local:any=await axios(`http://localhost:3001/localauth/profile?secret_token=${token}`)
    .catch((e)=>{
    })
   
    try{
        if(local !=="no soy local" && local){
             await user.updateOne({_id:local.data.user._id},{
                status:"VERIFICADO"
            }) 
            return res.json("VERIFICADO")
        }
        let userGoogle=await user.find({
            googleId:token})
            if(userGoogle){
                await user.updateOne({googleId:userGoogle[0].googleId},{
                    status:"VERIFICADO"
                })
                return res.json("VERIFICADO")
            }
        res.status(403).send("no se encontro")
    
    }
    catch(e){
        console.log(e)

    }

})

export default verifiqued