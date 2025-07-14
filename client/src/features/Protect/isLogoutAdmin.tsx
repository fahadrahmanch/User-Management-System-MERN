import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const IsLogoutAdmin=({children}:any)=>{
    const admin=useSelector((state:any)=>state?.adminAuth.adminInfo)
    if(admin){
        return <Navigate to='/admin/dashboard'/>
        
    }
    console.log("j")
    return children
}
export default IsLogoutAdmin