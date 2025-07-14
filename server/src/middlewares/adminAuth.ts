import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
export const verifyAdminAccessToken=(req:Request,res:Response,next:NextFunction)=>{
    const token=req.cookies.accessadminToken;

    try{
        const decoded:any=jwt.verify(token,process.env.ACCESS_SECRET!) ;   
    next()
    }
    catch(error){
        console.log(error)
        res.status(403).json({message:"Forbidden: Invalid or expired token"})
    }
}