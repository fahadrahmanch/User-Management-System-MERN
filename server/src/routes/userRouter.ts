import express,{Request,Response} from 'express'
import { userController } from '../controllers/userController'
export class userRouter{
    private router:express.Router
    private controller:userController
    constructor(controller:userController){
    this.controller=controller
    this.router=express.Router()
    this.initializeRoutes()
    }
    initializeRoutes(){
    this.router.post('/signup',(req:Request,res:Response)=>{
        this.controller.register(req,res)
    })
    this.router.post('/login',(req:Request,res:Response)=>{
        this.controller.login(req,res)
    })
    }
    getRouter(){
        return this.router
    }
    
}