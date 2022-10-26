import "dotenv/config"
import {connect} from "mongoose"

async function dbConnect():Promise<void>{
   const DB_URI=<string>"mongodb+srv://AleSangronis:JLYj7mTXf31icC7U@cluster0.yqhr51g.mongodb.net/?retryWrites=true&w=majority"
    await connect(DB_URI)
}

export default dbConnect