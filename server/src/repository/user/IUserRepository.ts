import { IUser } from "../../interfaces/IUser"
export interface IUSerRepository{
findByEmail(email:string):Promise<IUser|null>
save({name,email,password}:IUser):Promise<IUser|null>
}