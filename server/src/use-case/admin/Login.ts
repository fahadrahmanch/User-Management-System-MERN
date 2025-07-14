import adminRepository from "../../repository/admin/adminRepository"
import { adminEntity } from "../../entities/admin/admin"
import { IUser } from "../../interfaces/IUser"
import { generateTokens } from "../../utils/jwt"
class Login{
    private AdminRepository:adminRepository
    constructor(AdminRepository:adminRepository){
    this.AdminRepository=AdminRepository
    }
    async findUser(email:string,password:string):Promise<any>{
    const admin =await this.AdminRepository.findByEmail(email)
    
    if(!admin||admin.isAdmin==false){
        throw new Error("Unable to locate an admin with that email.")
    }
    const enitity=new adminEntity({name:admin.name,email:admin.email,password:admin.password})
    const checkPassword=await enitity.comparePassword(password)
    if(!checkPassword){
        throw new Error("Incorrect password. Please try again.")
    }

    const {accessToken,refreshToken} =generateTokens(admin._id)
     return {admin,accessToken,refreshToken}
    }
}
export default Login