import express,{Request,Response} from 'express'
import { IUser } from '../interfaces/IUser'
import { userRepository } from '../repository/user/userRepository' 
import  RegisterUser  from '../use-case/user/RegisterUserUseCase'
import LoginUser from '../use-case/user/LoginUserUseCase'
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
        catch(err){
            console.log(err)
        }
    }


    async login(req:Request,res:Response):Promise<void>{
        try{
            const {email,password}=req.body
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
            res.status(200).json({
                accessToken,
                user:{
                    id:user._id,
                    email:user.email
                }
            })
        }catch(err){

        }
  

    }
}
