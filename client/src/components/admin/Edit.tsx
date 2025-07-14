import { X } from 'lucide-react'
import React,{useState,useRef,useEffect} from 'react';
import { validationForupdatePage } from '../../validationForm/validation';
import { toast } from "react-toastify";
import axios from 'axios';
import API from '../../api/axios';
type EditProps = {
    editUser: any; 
    setEditModal:any;
    users:any;
    setUsers:any;
  };
const Edit:React.FC<EditProps>=({editUser,setEditModal,setUsers,users})=>{
const inputRef = useRef<HTMLInputElement | null>(null);
const[EditUser,setEditUser]=useState({name:"",email:"",imageUrl:""})
const [error,setError]=useState<any>({})
const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser((prev: any) => ({
        ...prev,
        [name]: value,
    }));

}
const handleUpdate = async (e:any) => {
    e.preventDefault();
    const validationErrors=validationForupdatePage(EditUser)
     setError(validationErrors)

    if(Object.keys(validationErrors).length>0){
        return
    }
    try {
        await API.post(`/admin/update/${editUser?._id}`, EditUser)
                toast.success("update successfull")
                setEditModal(false)
                const user=users.map((item:any)=>{
                    if(item._id==editUser._id){
                        return {...item,...EditUser}
                    }
                    return item
                })
                setUsers(user)
    }
    catch (err:any) {
        console.log(err)
        if(err?.response?.status===403){
            toast.error("Session expired. Please login again.");
            return
        }
        toast.error(err.response?.data?.message||"something went wrong");
    }

}
const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    let imageUrl = EditUser?.imageUrl
    
    try {
        const formData = new FormData()
        formData.append("file", file);
        formData.append("upload_preset", "UMS-MERN");
        const res = await axios.post('https://api.cloudinary.com/v1_1/dbo7vvi5z/image/upload', formData,)
        const data = res.data
            imageUrl = data.secure_url;
            setEditUser((prev: any) => ({
                ...prev,
                imageUrl
            }));
           
        } catch (err) {
            console.log("fail uploading error", err)
        }
    
}
useEffect(() => {
    if (editUser) {
      setEditUser({
        name: editUser.name || "",
        email: editUser.email || "",
        imageUrl: editUser.imageUrl || ""
      });
    }
  }, [editUser]);


const cancelEdit=()=>{
setEditModal(false)
 }
   const handleClick = () => {
    inputRef.current?.click()
}
    return (
        <>
       <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
<div className="bg-white p-8 rounded-md w-full max-w-sm shadow-md">
    <h1 className="flex justify-end" onClick={cancelEdit}><X className="w-5 h-5 cursor-pointer text-red-500 " /></h1>
                    <img src={EditUser?.imageUrl||""} alt="User" className="  w-32 h-32 rounded-full shadow-md mb-4 object-cover mx-auto cursor-pointer" 
                    onClick={handleClick}
                     />
                    <div className="flex justify-center mt-[-12px] mb-[10px]">
                        <button
                            className="text-sm item-center text-blue-600 underline hover:text-blue-800 transition"
                            onClick={handleClick}
                        >
                            Update Picture
                        </button>
                    </div>
                    <input name="image" type="file" className="mx-auto"
                     ref={inputRef} 
                    onChange={handleImageChange}
                     hidden></input>
                    <input name='name' className="w-full mb-4 p-2 border rounded" placeholder="name" value={EditUser?.name}
                     onChange={(e) => updateValue(e)}
                      /><br />
                    <p className="text-red-500 text-sm font-medium">{error.name?error.name:''}</p>

                    <input name='email' className="w-full mb-4 p-2 border rounded" placeholder="email" value={EditUser?.email} 
                    onChange={(e) => updateValue(e)} 
                    /><br />
           
                <p className="text-red-500 text-sm font-medium">{error.email?error.email:''}</p>
                    {/* <input name="phone" className="w-full mb-4 p-2 border rounded" placeholder="phone" value={userData?.phone} onChange={(e) => updateValue(e)} /> */}
                    <button className="w-full h-12 font-bold" style={{ backgroundColor: '#4998cc' }} 
                    onClick={handleUpdate}
                    >Update</button>
                </div>
            </div>

                            </>
    )
}
export default Edit