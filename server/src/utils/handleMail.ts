import nodemailer from "nodemailer";
const { APP_MAIL_PASSWORD } = process.env;

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "cointrackerhernypf@gmail.com", // generated ethereal user
      pass: APP_MAIL_PASSWORD, // generated ethereal password
    },
  });

  const response=async(email:any,subject:any, html:any)=>{
try{
    await transporter.sendMail({
        from:'"successful delivery confirmation" <cointrackerhernypf@gmail.com>',
        to:email,
        subject,
        html
    })
}
catch(e){
    console.log("algo salio mal",e)
}}

const verifi=async(email:any,name:any,message:any)=>{
    try{
        await transporter.sendMail({
            from:'"User Contact Email" <cointrackerhernypf@gmail.com>',
            to:"cointrackerhernypf@gmail.com",
            subject:"User Contact Email",
            html:`
            <b>De: ${email}<b/>
      <h3>El usuario "${name}" acaba de mandar este mensaje: </h3>
      <br/>
      <b>${message}<b/>
            `
        })
    }
    catch(e){
        console.log("algo salio mal",e)
    }}

const getTemplate=(name:any,token:any)=>{
    console.log(token)
return `<div>
<b>Hola ${name} </b>
<p>Para confirmar tu cuenta, ingrese al siguiente enlace</p>
<a href="http://localhost:5173/verifiqued/${token}">Confirmar cuenta</a>
</div>

`

}

export {response,verifi,getTemplate}
  