import { IUser } from "../../interfaces/IUser"
export interface IAdminRepository{
findByEmail(email:string):Promise<IUser|null>
save({name,email,password}:IUser):Promise<IUser|null>
findById(id:string):Promise<IUser|null>
findByIdandUpadte(id: string, updateData: Partial<IUser>):Promise<IUser|null>
fecthUser():Promise<any>
deleteUser(userId:string):Promise<any>
}