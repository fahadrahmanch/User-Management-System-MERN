export interface IUser{
    _id?:string;
    email:string;
    name:string;
    password:string;
    imageUrl?:string;
    isAdmin?:Boolean
}