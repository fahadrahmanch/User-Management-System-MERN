 import { IUser } from "../../interfaces/IUser"
 import { userRepository } from "../../repository/user/userRepository"
 import { userEntity } from "../../entities/user/user"
 class RegisterUser{
    private UserRepository:userRepository
    constructor(UserRepository:userRepository){
    this.UserRepository=UserRepository
    }

    async create({name,email,password}:IUser):Promise<IUser>{
    const exists=await this.UserRepository.findByEmail(email)
    if(exists){
        throw new Error("user already exists with this email")
    }
    const newUser=new userEntity({name,email,password})
    const hashPassword= await newUser.hashPassword()
    return await this.UserRepository.save(newUser)
    }
}
export default RegisterUser