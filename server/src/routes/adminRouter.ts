import express,{Request,Response} from 'express'
import adminController from '../controllers/adminController'
import { verifyAdminAccessToken } from '../middlewares/adminAuth'
class adminRouter{
    private router:express.Router
    private AdminController
    constructor(AdminController:adminController){
        this.AdminController=AdminController
        this.router=express.Router()
        this.initializeRoutes()
    }
    initializeRoutes(){
       this.router.get('/users',verifyAdminAccessToken,(req:Request,res:Response)=>{
        this.AdminController.fetchUsers(req,res)
       })
       this.router.post("/user/:id",verifyAdminAccessToken,(req:Request,res:Response)=>{
        this.AdminController.deleteUser(req,res)
       })
       this.router.post("/add",verifyAdminAccessToken,(req:Request,res:Response)=>{
        this.AdminController.addUser(req,res)
       })

       this.router.post('/update/:id',verifyAdminAccessToken,(req:Request,res:Response)=>{
        this.AdminController.update(req,res)
       })

       this.router.post("/login",(req:Request,res:Response)=>{
        this.AdminController.login(req,res)
       })
       this.router.get('/token/refresh',(req:Request,res:Response)=>{
        this.AdminController.refresh(req,res)
    })

    }
        getRouter(){
            return this.router
        }
}
export default adminRouter