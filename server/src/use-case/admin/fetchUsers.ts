import adminRepository from "../../repository/admin/adminRepository"
class fetchUsers{
    private AdminRepository:adminRepository
    constructor(AdminRepository:adminRepository){
    this.AdminRepository=AdminRepository
    }
    async users():Promise<any>{
        return this.AdminRepository.fecthUser()
    }
}
export default fetchUsers   