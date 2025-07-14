import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const RequireAdmin=({children}:any)=>{
const adminInfo=useSelector((state:any)=>state?.adminAuth.adminInfo)
if(!adminInfo){
    return <Navigate to='/admin/login'/>
}
return children
}
export default RequireAdmin