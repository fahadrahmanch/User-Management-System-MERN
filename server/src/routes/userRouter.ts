import express,{Request,Response} from 'express'
import { userController } from '../controllers/userController'
import { verifyAccessToken } from '../middlewares/userAuth'
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
    this.router.get('/home/:id',verifyAccessToken,(req:Request,res:Response)=>{
        this.controller.userDetails(req,res)
    })
    this.router.get('/logout',(req:Request,res:Response)=>{
        this.controller.logout(req,res)
    })
    this.router.post('/update/:id',verifyAccessToken,(req:Request,res:Response)=>{
        this.controller.update(req,res)
    })
    this.router.get("/verify", verifyAccessToken, (req:Request, res:Response) => {
        res.status(200).json({ message: "Token is valid" });
      });
    this.router.get('/token/refresh',(req:Request,res:Response)=>{
        this.controller.refresh(req,res)
    })
}
    getRouter(){
        return this.router
    }
    
}