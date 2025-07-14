import dotenv from 'dotenv'
dotenv.config();

import express, {Application}from 'express'
import { userRouter } from './routes/userRouter'
import { userController } from './controllers/userController'
import { userRepository } from './repository/user/userRepository';
import { connectDB } from './config/db';
import cookieParser from 'cookie-parser';
import adminController from './controllers/adminController';
import adminRepository from './repository/admin/adminRepository';
import adminRouter from './routes/adminRouter';
import cors from 'cors';
export class app{
    public app:Application
    constructor(){
        this.app=express()
        this.setMiddleWares()
        this.setUserRouter()
        this.setAdminRouter()
    }
    setMiddleWares(){
        this.app.use(cors({
            origin:"http://localhost:5173",
            credentials: true
        })); 
        this.app.use(express.json())
        this.app.use(cookieParser()); 
    }
    injectionUser(){
        const UserRepository= new userRepository()
        const UserController =new userController(UserRepository)
        return UserController
    }
    injectAdmin(){
        const AdminRepository=new adminRepository()
        const Admincontroller=new adminController(AdminRepository)
        return Admincontroller
    }
    setAdminRouter(){
       const admin=this.injectAdmin()
       const routerAdmin=new adminRouter(admin)
       this.app.use('/admin',routerAdmin.getRouter())
    }
    setUserRouter(){
        const user=this.injectionUser()
        const routerUser=new userRouter(user)
        this.app.use("/user",routerUser.getRouter())
    }
    //server running 
   async listen(){
        const db=new connectDB()
        await db.connectDatabase()
        this.app.listen(process.env.PORT,()=>{
            console.log("server is running")
        })
    }
}

const App:app=new app()
App.listen()