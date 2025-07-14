import { IUSerRepository } from "../../repository/user/IUserRepository"
import { IUser } from "../../interfaces/IUser"
import { userEntity} from "../../entities/user/user"
import { generateTokens } from "../../utils/jwt"
class LoginUser {
    private UserRepository: IUSerRepository
    constructor(userRepository: IUSerRepository) {
        this.UserRepository = userRepository
    }
   async findUser(email:string,password:string):Promise<any>{
        const user=await this.UserRepository.findByEmail(email)
        if (!user) {
            throw new Error("No account found with the provided email address.")
        }
        const UserEntity=new userEntity({
           name: user.name,
           email: user.email,
           password: user.password
        })
        const passwordMatch= await UserEntity.comparePassword(password)
        if(!passwordMatch){
            throw new Error("Incorrect password. Please try again.")
        }
        const {accessToken,refreshToken} =generateTokens(user._id)
        return {user,accessToken,refreshToken}
    }

}
export default LoginUser