import mongoose,{Schema} from "mongoose";
import { IUser } from "../interfaces/IUser";
const userSchema:mongoose.Schema=new Schema<IUser>({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
}
})
export const User= mongoose.model<IUser>('user',userSchema)