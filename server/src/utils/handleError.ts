import { Response } from "express"
const handleError=(res:Response, message:string="algo sucedio",code:number=403)=>{
res.status(code);
res.send({error:message})
}
export default handleError