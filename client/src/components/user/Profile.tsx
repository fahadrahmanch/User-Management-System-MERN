import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import API from "../../api/axios"
import { setCredentials } from "../../features/Slices/authSlice"
import { validationForupdatePage } from "../../validationForm/validation"
import { toast } from "react-toastify";
import { logout } from "../../features/Slices/authSlice"
const ProfileDiv: React.FC = () => {
    const userInfo = useSelector((state: any) => state?.auth.userInfo)
    const [userData, setUserData] = useState<any>({})
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [error,setError]=useState<any>({})
    // const [selectedFile, setSelecedFile] = useState<File | null>(null)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     setUserData({ id: userInfo?.id, 
    //                   name: userInfo?.name,
    //                   email: userInfo?.email, 
    //                   phone: userInfo?.phone, 
    //                   imageUrl: userInfo?.imageUrl 
    //                 })
    // }, [])
    useEffect(()=>{
        const fectuUserDetails=async()=>{
          try{
            const res= await API.get(`/user/home/${userInfo.id}`,{
              withCredentials: true
             })
             setUserData({
              id:res.data._id,
              name: res.data.name,
              email: res.data.email,
              imageUrl: res.data?.imageUrl,
            });
      
          //   dispatch(setCredentials(setUserData))
      
          }catch(err:any){
              if(err?.response?.status===403){
                //   hasLoggedOut.current=true
                  toast.error("Session expired. Please login again.");
                  dispatch(logout())
                  return
              }
              
          }
        }
        fectuUserDetails()
      
      },[])
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        let imageUrl = userData?.imageUrl
        
        try {
            const formData = new FormData()
            formData.append("file", file);
            formData.append("upload_preset", "UMS-MERN");
            const res = await axios.post('https://api.cloudinary.com/v1_1/dbo7vvi5z/image/upload', formData,)
            const data = res.data
                imageUrl = data.secure_url;
                setUserData((prev: any) => ({
                    ...prev,
                    imageUrl
                }));
               
            } catch (err) {
                console.log("fail uploading error", err)
            }
        
    }
    const handleClick = () => {
        inputRef.current?.click()
    }
 
    const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    
    }
    const handleUpdate = async (e:any) => {
        e.preventDefault();
        const validationErrors=validationForupdatePage(userData)
         setError(validationErrors)
    
        if(Object.keys(validationErrors).length>0){
            return
        }
        try {
            await API.post(`/user/update/${userData?.id}`, userData)
                .then((res) => {
                    dispatch(setCredentials(res.data))
                    toast.success("update successfull")
                })
                .catch((err) => {
                    if(err?.response?.status===403){
                        toast.error("Session expired. Please login again.");
                        dispatch(logout())
                        return
                    }
                    toast.error(err.response?.data?.message||"something went wrong");
                    console.log(err)
                })
        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        <>
            <div className="h-[745px] flex justify-center items-center">
                <div className="bg-white p-8 rounded-md w-full max-w-sm shadow-md">
                    <img src={userData.imageUrl} alt="User" className="  w-32 h-32 rounded-full shadow-md mb-4 object-cover mx-auto" onClick={handleClick} />
                    <div className="flex justify-center mt-[-12px] mb-[10px]">
                        <button
                            className="text-sm item-center text-blue-600 underline hover:text-blue-800 transition"
                            onClick={handleClick}
                        >
                            Update Picture
                        </button>
                    </div>
                    <input name="image" type="file" className="mx-auto" ref={inputRef} onChange={handleImageChange} hidden></input>
                    <input name='name' className="w-full mb-4 p-2 border rounded" placeholder="name" value={userData?.name} onChange={(e) => updateValue(e)} /><br />
                    <p className="text-red-500 text-sm font-medium">{error.name?error.name:''}</p>

                    <input name='email' className="w-full mb-4 p-2 border rounded" placeholder="email" value={userData?.email} onChange={(e) => updateValue(e)} /><br />
           
                <p className="text-red-500 text-sm font-medium">{error.email?error.email:''}</p>
                    {/* <input name="phone" className="w-full mb-4 p-2 border rounded" placeholder="phone" value={userData?.phone} onChange={(e) => updateValue(e)} /> */}
                    <button className="w-full h-12 font-bold" style={{ backgroundColor: '#4998cc' }} onClick={handleUpdate}>Update</button>
                </div>

            </div>

        </>
    )
}
export default ProfileDiv