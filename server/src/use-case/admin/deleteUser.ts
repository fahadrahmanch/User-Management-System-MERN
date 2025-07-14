import adminRepository from "../../repository/admin/adminRepository"
class deleteUser{
    private AdminRepository:adminRepository
    constructor(AdminRepository:adminRepository){
    this.AdminRepository=AdminRepository
    }
    async delete(userId:string):Promise<any>{
        if(!userId){
            throw new Error("user id is required")
        }
        
        return this.AdminRepository.deleteUser(userId)
    }
}
export default deleteUser