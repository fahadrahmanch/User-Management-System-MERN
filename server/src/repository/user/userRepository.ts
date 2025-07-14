import { IUser } from "../../interfaces/IUser";
import { IUSerRepository } from "./IUserRepository";
import { User } from "../../models/user";
export class userRepository implements IUSerRepository{
 constructor(){}
 async findByEmail(email:string): Promise<IUser|null> {
     return await User.findOne({email:email})
 }
 async findById(id:string):Promise<IUser|null>{
    return await User.findById(id)
 }
 async findByIdandUpadte(id: string, updateData: Partial<IUser>):Promise<IUser|null>{
    return await User.findByIdAndUpdate(id, updateData, { new: true })
 }
 async save(newUser:IUser):Promise<IUser>{
    return await User.create(newUser)
 }
}
