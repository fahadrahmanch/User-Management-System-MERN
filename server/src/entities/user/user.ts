import bcrypt from 'bcrypt';

export class userEntity{
    public name:string;
    public email:string;
    public password:string;
    constructor({name,email,password}:{name:string,email:string,password:string}){
        this.name=name
        this.email=email
        this.password=password
    }

   async hashPassword():Promise<void>{
    this.password=await bcrypt.hash(this.password,10)
   }
   async comparePassword(password:string):Promise<boolean>{
    return await bcrypt.compare(password, this.password)
   }
}