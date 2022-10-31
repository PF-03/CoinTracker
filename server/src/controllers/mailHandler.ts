import { Response, Request } from "express";
import handleError from "../utils/handleError";
import axios from "axios";
import nodemailer from "nodemailer";
require("dotenv").config();
const { APP_MAIL_PASSWORD } = process.env;

const postMail: any = async (req: Request, res: Response) => {
  try {
    console.log()
    var  {name,email,message}=req.body
    if(!name)name="Anonumus name";
    if(!message)message="No message"
    if(!email)return res.status(404).json({error:"Email is not provided"})
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "cointrackerhernypf@gmail.com", // generated ethereal user
        pass: APP_MAIL_PASSWORD, // generated ethereal password
      },
    });
    await transporter.verify().then(()=>{
      console.log("Successfully logged into Google and ready to send emails")
    })
    const response =await transporter.sendMail({
      from: '"User Contact Email" <cointrackerhernypf@gmail.com>', // sender address
      to: "cointrackerhernypf@gmail.com", // list of receivers
      subject: "User Contact Email", // Subject line
      /* text: "User Contact Email",  */// plain text body
      html:`
      <b>De: ${email}<b/>
      <h3>El usuario "${name}" acaba de mandar este mensaje: </h3>
      <br/>
      <b>${message}<b/>
      `, // html body
    });
    const verify= await transporter.sendMail({
      from: '"successful delivery confirmation" <cointrackerhernypf@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "successful delivery confirmation", // Subject line
      /* text: "User Contact Email",  */// plain text body
      html:`
      <b>Your message: "${message}" was sent correctly<b/>
      `, // html body
    });
    res.status(202).json(response);
  } catch (err) {
    handleError(res, `ERROR_POST_MAIL : ${err}`);
  }
};

export { postMail };
