import mongoose, { plugin } from "mongoose";
import mongoose_delete from "mongoose-delete"

 const User= new mongoose.Schema(
    {
        username:{
            type:String,
            unique:true
        },
        password:{
            type:String,
            select:false,  //con esto no se envia en la respuesta cuando utilizo un filtrado (find)
        },
        email:{
            type:String,
            unique:true
        },
        name:{
            type:String,
        },
        lastname:{
            type:String,
        },
        type:{
            type:["user","admin"],
            default:"user"
        },
        activo:{
            type:Boolean,
            default:true
        }
},
{
    timestamps:true,
    versionKey:false,

}
);
User.plugin(mongoose_delete);
export default mongoose.model("users", User);