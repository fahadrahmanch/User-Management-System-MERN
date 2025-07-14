import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { User } from "../models/user";
dotenv.config();

export const verifyAccessToken=async(req:Request,res:Response,next:NextFunction)=>{
    const token=req.cookies.accessToken;
  
    try{
        const decoded:any=jwt.verify(token,process.env.ACCESS_SECRET!) ; 
        console.log(decoded.id)  
        const user=await User.findById(decoded.id)
        if(!user){
             res.status(401).json({ message: "User deleted or not found" });
             return
        }
        
    next()
    }
    catch(error){
        console.log(error)
        res.status(403).json({message:"Forbidden: Invalid or expired token"})
    }
}