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
},
imageUrl:{
    type:String,
    default: 'https://res.cloudinary.com/demo/image/upload/v1690000000/default-profile.jpg',
    required:false
},
isAdmin:{
    type:Boolean,
    required:false,
    default:false
}

})
export const User= mongoose.model<IUser>('user',userSchema)