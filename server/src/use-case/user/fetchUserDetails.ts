import { IUSerRepository } from "../../repository/user/IUserRepository"
import { IUser } from "../../interfaces/IUser"
class fetchUser{
    private UserRepository: IUSerRepository
    constructor(userRepository: IUSerRepository) {
        this.UserRepository = userRepository
    }
    async fetchDetails(userId:string):Promise<IUser|null>{
        return await this.UserRepository.findById(userId)
    }
}
export default fetchUser