import { Response, Request } from "express";
import handleError from "../utils/handleError";
import { response, verifi , getTemplate} from "../utils/handleMail";

const postMail: any = async (req: Request, res: Response) => {
    try {
      var  {name,email,message}=req.body
      if(!name)name="Anonumus name";
      if(!message)message="No message"
      if(!email)return res.status(404).json({error:"Email is not provided"})
      let html=`
        <b>Your message: "${message}" was sent correctly<b/>
        `

      const enviarUsusario=response(email,"successful delivery confirmation", html)
      const enviarCoinTrcaker=verifi(email, name, message)
      res.status(202).json(enviarUsusario);
    }
    catch(err){
        handleError(res, `ERROR_POST_MAIL : ${err}`);
    }}


    const verifiqued:any=async(req: Request, res: Response)=>{
console.log(req.body)
console.log(req.query)

        try{
    const { token }=req.params
    const {name, mail}=req.body
    const validacion=getTemplate(name, token)
    const enviarValidacion=response(mail, "Verifiquese", validacion)
    res.status(202).send("ENVIADO")
}
catch(e){
    handleError(res, `ERROR_POST_MAIL : ${e}`);
}
}

export {postMail,verifiqued}