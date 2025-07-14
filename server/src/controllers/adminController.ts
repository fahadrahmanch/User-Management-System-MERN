import express,{Request,Response} from 'express'
import adminRepository from '../repository/admin/adminRepository'
import fetchUsers from '../use-case/admin/fetchUsers';
import deleteUser from '../use-case/admin/deleteUser';
import updateUser from '../use-case/admin/updateUser';
import addUser from '../use-case/admin/addUser';
import Login from '../use-case/admin/Login';
import jwt, { SignOptions } from 'jsonwebtoken';

class adminController{
    private AdminRepository:adminRepository;
    constructor(AdminRepositoy:adminRepository){
    this.AdminRepository=AdminRepositoy
    }
    
    async fetchUsers(req:Request,res:Response):Promise<void>{
    
        try{
            const FetchUsers=new fetchUsers(this.AdminRepository)
            const users=await FetchUsers.users()
            res.status(200).json({status:"success",users:users})
        }catch(err){
            console.log(err)
        }
  

    }
    async deleteUser(req:Request,res:Response):Promise<void>{
        try{
            const userId=req.params.id
            const DeleteUser=new deleteUser(this.AdminRepository)
            await DeleteUser.delete(userId)
            res.status(200).json({message:"delete user"})
        }catch(err:any){
            console.log(err)
            res.status(401).json({message:err.message})
        }
    }
    async update(req:Request,res:Response):Promise<void>{
        try{
           const userData=req.body
           const userId=req.params.id
           const Update=new updateUser(this.AdminRepository)
           const updateUserData= await Update.updateUser(userId,userData)
           if(!updateUserData)return
           res.status(200).json({id:updateUserData._id,name:updateUserData.name,email:updateUserData.email,imageUrl:updateUserData?.imageUrl})

        }
        catch(err:any){
            res.status(401).json({ message: err.message });

        }
    }
    async addUser(req:Request,res:Response):Promise<void>{
        try{
         const newUser=req.body
         const Add=new addUser(this.AdminRepository)
         const user=await Add.addUser(newUser)
         res.json({message:"user registration is successfull",user:user})
        }
        catch(err:any){
            console.log(err)
            res.status(401).json({ message: err.message });
        }
    }

    async login(req:Request,res:Response):Promise<void>{
        try{
        const {email,password}=req.body
        const LoginAdmin= new Login(this.AdminRepository)
        const {admin, accessToken, refreshToken}=await LoginAdmin.findUser(email,password)
        res.cookie("refreshadminToken",refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
         })
         res.cookie("accessadminToken",accessToken,{
             httpOnly:true,
             secure:true,
             sameSite:"strict",
             maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          })
         res.status(200).json({
                 id:admin?._id,
                 name:admin?.name,
                 email:admin?.email,
                 
         })
        }
        catch(err:any){
            console.log(err)
            res.status(401).json({ message: err.message });
        }
    }

    async refresh(req:Request,res:Response):Promise<void>{
        const token=req.cookies.refreshadminToken
        if(!token){
            res.status(401).json({ message: "No refresh token provided" });
            return
         }
        try{
            const decoded=jwt.verify(token,process.env.REFRESH_SECRET!)as any
            const accessToken =  jwt.sign(
                { id: decoded.id },
                process.env.ACCESS_SECRET!,
                { expiresIn: process.env.ACCESS_EXPIRY || "1h" }as SignOptions
              );
              res.cookie("accessadminToken",accessToken,{
                httpOnly:true,
                secure:true,
                sameSite:"strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
             })
             res.status(200).json({ message: "Token refreshed" }); 
              return
        }
        catch(err){
            console.log(err)
        }
    }

}
export default adminController