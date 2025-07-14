import adminRepository from "../../repository/admin/adminRepository"
import { IUser } from "../../interfaces/IUser"
class updateUser{
    private AdminRepository:adminRepository
    constructor(AdminRepository:adminRepository){
    this.AdminRepository=AdminRepository
    }
    async updateUser(userId:string,userData:Partial<IUser>):Promise<IUser|null>{
        const exists=await this.AdminRepository.findByEmail(userData.email as string)
        if(exists&&exists._id?.toString()!==userId){
            throw new Error("Already have user with this email")
        }
        return await this.AdminRepository.findByIdandUpadte(userId,userData)
    }
}
export default updateUser