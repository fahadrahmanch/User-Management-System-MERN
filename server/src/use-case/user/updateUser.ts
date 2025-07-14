import { IUSerRepository } from "../../repository/user/IUserRepository"
import { IUser } from "../../interfaces/IUser"
class updateUser{
    private UserRepository: IUSerRepository
    constructor(userRepository: IUSerRepository) {
        this.UserRepository = userRepository
    }
    async updateUser(userId:string,userData:Partial<IUser>):Promise<IUser|null>{
        const exists=await this.UserRepository.findByEmail(userData.email as string)
        if(exists&&exists._id?.toString()!==userId){
            throw new Error("Already have user with this email")
        }
        return await this.UserRepository.findByIdandUpadte(userId,userData)
    }
}
export default updateUser