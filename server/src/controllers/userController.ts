import { IUser } from '../interfaces/IUser'
import { userRepository } from '../repository/user/userRepository' 
import  RegisterUser  from '../use-case/user/RegisterUserUseCase'
import LoginUser from '../use-case/user/LoginUserUseCase'
import fetchUser from '../use-case/user/fetchUserDetails'
import updateUser from '../use-case/user/updateUser'
import jwt, { SignOptions } from 'jsonwebtoken';
import express,{Request,Response} from 'express'

export class userController{
    private UserRepository:userRepository
    constructor(UserRepository:userRepository){
     this.UserRepository=UserRepository
    }
    async register(req:Request,res:Response):Promise<void>{
        
        try{
            const {name,email,password,}=req.body
            if(!name||!email||!password){
                throw new Error("All fields are required")
            }
            const registerUser=new RegisterUser(this.UserRepository)
            const userData=await registerUser.create(req.body)
            res.json({message:"user registration is successfull"})
            
        }
        catch(err:any){
            console.log(err)
            res.status(401).json({ message: err.message });
        }
    }


    async login(req:Request,res:Response):Promise<void>{
        try{
            const {email,password}=req.body
            console.log(req.body)
            if(!email||!password){
                throw new Error("All fields are required")
            }
            const loginUser=new LoginUser(this.UserRepository)
            const {user, accessToken, refreshToken}=await loginUser.findUser(email,password)
            res.cookie("refreshToken",refreshToken,{
               httpOnly:true,
               secure:true,
               sameSite:"strict",
               maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            })
            res.cookie("accessToken",accessToken,{
                httpOnly:true,
                secure:true,
                sameSite:"strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
             })
            res.status(200).json({
                    id:user?._id,
                    name:user?.name,
                    email:user?.email,
                    imageUrl:user?.imageUrl
            })
        }catch(err:any){
           console.log(err)
           res.status(401).json({ message: err.message });
        }
  

    }
    async userDetails(req:Request,res:Response):Promise<any>{
        try{
         const user_id=req.params.id
         if(!user_id){
             res.status(404).json({ message: "User ID is missing in the request." });
            return
         }
         const userFetch=new fetchUser(this.UserRepository)
         const userData=await userFetch.fetchDetails(user_id)
         if(!userData){
            res.status(404).json({ message: "User not found with the given ID." });
            return
         }
          res.status(200).json(userData);
          return
        }catch(error){
            console.error("Error fetching user details:", error);
             res.status(500).json({ message: "Internal server error while fetching user details." });
        }
    }
    async logout(req:Request,res:Response):Promise<void>{
        try{
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
              });
              res.clearCookie('accessToken',{
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
              })
               res.status(200).json({ message: 'Logged out successfully' });
               return
        }
        catch(err){
            console.log(err)
        }
    }
    async update(req:Request,res:Response):Promise<void>{
        try{
        const userData=req.body
        const update=new updateUser(this.UserRepository)
        const updateUserData=await update.updateUser(userData.id,userData)
        if(!updateUserData) return
        res.status(200).json({id:updateUserData._id,name:updateUserData.name,email:updateUserData.email,imageUrl:updateUserData?.imageUrl})
        }
        catch(err:any){
            res.status(401).json({ message: err.message });
        }
    }
    async refresh(req:Request,res:Response):Promise<void>{
     const token=req.cookies.refreshToken
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
          res.cookie("accessToken",accessToken,{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, 
         })
         res.status(200).json({ message: "Token refreshed" }); 
          return
     }
     catch(err){
        res.status(403).json({ message: "Invalid refresh token" });
        return
     }
    }
}
