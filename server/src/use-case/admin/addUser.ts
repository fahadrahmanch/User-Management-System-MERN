import adminRepository from "../../repository/admin/adminRepository"
import { IUser } from "../../interfaces/IUser"
import { userEntity } from "../../entities/user/user"
class addUser{
    private AdminRepository:adminRepository
    constructor(AdminRepository:adminRepository){
    this.AdminRepository=AdminRepository
    }
    
    async addUser(newUser:IUser):Promise<IUser|null>{
    const exists=await this.AdminRepository.findByEmail(newUser.email)
    if(exists){
        throw new Error("user already exists with this email")
    }
    const UserEntity=new userEntity({name:newUser.name,email:newUser.email,password:newUser.password,imageUrl:newUser.imageUrl})
    const hashPassword= await UserEntity.hashPassword()
    return await this.AdminRepository.save(UserEntity)
    }
}
export default addUser