import { useEffect, useState,useRef } from "react"
import API from "../../api/axios"
import {  useSelector,useDispatch } from "react-redux"
import { logout, setCredentials } from "../../features/Slices/authSlice"
import { toast } from "react-toastify";
// import { setCredentials } from "../../features/Slices/authSlice"
const HomeDiv=()=>{
const [userData,setUserData]=useState<any>({})
const userInfo=useSelector((state:any)=>state?.auth?.userInfo)
const dispatch=useDispatch()
const hasLoggedOut = useRef(false);

useEffect(()=>{
  const fectuUserDetails=async()=>{
    try{
      const res= await API.get(`/user/home/${userInfo.id}`,{
        withCredentials: true
       })
       setUserData({
        name: res.data.name,
        email: res.data.email,
        imageUrl: res.data?.imageUrl,
      });

    //   dispatch(setCredentials(setUserData))

    }catch(err:any){
        if(err?.response?.status===403&&!hasLoggedOut.current){
            hasLoggedOut.current=true
            toast.error("Session expired. Please login again.");
            dispatch(logout())
            return
        }
        
    }
  }
  fectuUserDetails()

},[])
    return(
        <>
        <div className="h-[745px] bg-gray-100 flex justify-center items-center p-6 home">
          <div className="bg-white rounded-xl shadow-md   p-6 flex flex-col items-center w-[20rem]">
            
            <img
              src={userData?.imageUrl}
              alt="User"
              className="w-32 h-32 rounded-full shadow-md mb-4 object-cover "
            />
            <h1 className="text-2xl font-bold text-gray-800">{userData?.name}</h1>

            <p className="mt-3 text-center text-gray-600">
              {userData?.email}
            </p>
          </div>
        </div>
            
      </>
      
    )
}
export default HomeDiv