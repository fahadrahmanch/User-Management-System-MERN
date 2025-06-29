import dotenv from 'dotenv'
dotenv.config();

import express, {Application}from 'express'
import { userRouter } from './routes/userRouter'
import { userController } from './controllers/userController'
import { userRepository } from './repository/user/userRepository';
import { connectDB } from './config/db';
import cors from 'cors';
export class app{
    public app:Application
    constructor(){
        this.app=express()
        this.setMiddleWares()
        this.setUserRouter()
    }
    setMiddleWares(){
        this.app.use(cors({
            origin:"http://localhost:5173",
        })); 
        this.app.use(express.json())
    }
    injectionUser(){
        const UserRepository= new userRepository()

        const UserController =new userController(UserRepository)
        return UserController
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
            // console.log("access scret",process.env.ACCESS_SECRET)
            // console.log("refres scret",process.env.REFRESH_SECRET)
            console.log("server is running")
        })
    }
}

const App:app=new app()
App.listen()