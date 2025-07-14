import React, { useRef, useState } from "react";
import { X } from 'lucide-react'
import API from "../../api/axios";
import axios from "axios";
import { toast } from "react-toastify";
import { validationForAddUser } from "../../validationForm/validation";
type addUser={
    setAddModal:any
    setUsers:any;
}
const AddUser:React.FC<addUser>=({setAddModal,setUsers})=>{
const [user,setUser]=useState({name:"",email:"",password:"",confirmPassword:"",imageUrl:""})
const inputRef=useRef<HTMLInputElement | null>(null)
const [error,setError]=useState<any>({})

const updateValue=(e:any)=>{
    const {name,value}=e.target

    setUser((prev:any)=>({
        ...prev,
        
        [name]:value,
    }))
}
const handleImageChange=async(e:React.ChangeEvent<HTMLInputElement>)=>{
  
    const file=e.target.files?.[0]
    if(!file ) return
    try{
    const formData=new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "UMS-MERN");   
    const res = await axios.post('https://api.cloudinary.com/v1_1/dbo7vvi5z/image/upload', formData)
    const data=res.data
    const imageUrl= data.secure_url;
    console.log('imageUrl',imageUrl)
    setUser((prev:any)=>({...prev,imageUrl})
)
   

    }
    catch(err){
        console.log("fail uploading error", err)
    }
}

const update=async(e:any)=>{
    e.preventDefault();
    const validationErrors=validationForAddUser(user)
     setError(validationErrors)

    if(Object.keys(validationErrors).length>0){
        return
    }
    try{
    const res=await API.post("/admin/add",user)
    const data=res.data?.user
    setUsers((users:any[])=>([
        ...users,
        {name:data.name,email:data.email,imageUrl:data.imageUrl}

    ]))
setAddModal(false)
    toast.success("update successfull")

    
    }
    catch(err:any){
        console.log(err)
        toast.error(err.response?.data?.message||"something went wrong");
    }
}
const openFile=()=>{
inputRef.current?.click()
}


    return(
        <>
       <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-md w-full max-w-sm shadow-md">
            <h1 className="flex justify-end" onClick={()=>setAddModal(false)}><X className="w-5 h-5 cursor-pointer text-red-500 " /></h1>

                <img src={user.imageUrl} alt="User" className="  w-32 h-32 rounded-full shadow-md mb-4 object-cover mx-auto"  onClick={openFile}
                 />
                <div className="flex justify-center mt-[-12px] mb-[10px]">
                    <button
                        className="text-sm item-center text-blue-600 underline hover:text-blue-800 transition"
                        onClick={openFile}
                    >
                        Add Picture
                    </button>
                </div>
                <input name="image" type="file" className="mx-auto" ref={inputRef} onChange={handleImageChange} hidden></input>
                <input name='name' className="w-full mb-4 p-2 border rounded" placeholder="name" onChange={(e)=>updateValue(e)}  /><br />
                <p className="text-red-500 text-sm font-medium">{error.name?error.name:''}</p>

                <input name='email' className="w-full mb-4 p-2 border rounded" placeholder="email"  onChange={(e)=>updateValue(e)} /><br />
            <p className="text-red-500 text-sm font-medium">{error.email?error.email:''}</p>
                <input name='password' className="w-full mb-4 p-2 border rounded" placeholder="password" type="password" onChange={(e)=>updateValue(e)} /><br />
                <p className="text-red-500 text-sm font-medium">{error.password?error.password:''}</p>

                <input name='confirmPassword' className="w-full mb-4 p-2 border rounded" placeholder="confirmPassword" type="password" onChange={(e)=>updateValue(e)}/><br />
                <p className="text-red-500 text-sm font-medium">{error.confirmPassword?error.confirmPassword:''}</p>

                {/* <input name="phone" className="w-full mb-4 p-2 border rounded" placeholder="phone" value={userData?.phone} onChange={(e) => updateValue(e)} /> */}
                <button className="w-full h-12 font-bold" style={{ backgroundColor: '#4998cc' }} onClick={update} >Add user</button>
            </div>

        </div>

    </>
    )
}
export default AddUser