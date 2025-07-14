import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../Slices/authSlice";
import API from "../../api/axios";
import { toast } from "react-toastify";
 const RequireAuth=({children}:any)=>{
    const dispatch=useDispatch()
    const userInfo=useSelector((state:any)=>state?.auth?.userInfo)
    console.log('userInfo',userInfo)
    if(!userInfo){
        return <Navigate to="/user/login" />
    }
    useEffect(()=>{
        const verifyToken=async()=>{
            try{
             await API.get('/user/verify',{
                withCredentials:true
             })
            }
            catch(error:any){
                if (error.response?.status === 401) {
                    toast.error("Your account has been deleted by the admin.");
                    dispatch(logout());
                  }
                if(error.response.status==403){
                    dispatch(logout());
                    return
                }
            }
        }
        verifyToken()
    },[])
    return children
}
export default RequireAuth