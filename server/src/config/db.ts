import mongoose from "mongoose";
import dotenv from 'dotenv'
// dotenv.config()
// const j=process.env.

export class connectDB{
    private DB_URL
    constructor(){
    this.DB_URL='mongodb://localhost:27017/student-management-system-mern'  
    }
    public async connectDatabase(): Promise<void>{
        try{
            await mongoose.connect(this.DB_URL)
            console.log('Database connected')
        }catch(err){
            console.error(err,'Mongo db connection fail')
            process.exit(1)
        }
    } 
}