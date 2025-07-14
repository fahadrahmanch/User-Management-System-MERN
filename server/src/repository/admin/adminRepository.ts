import { IUser } from "../../interfaces/IUser"
import { User } from "../../models/user"
import { IAdminRepository } from "./IAdminRepository"
class adminRepository implements IAdminRepository{
    constructor(){}
    async fecthUser():Promise<any>{
        return await User.find({isAdmin:false})
    }
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
    async deleteUser(userId: string): Promise<any> {
        return await User.findByIdAndDelete(userId)
    }


}
export default adminRepository