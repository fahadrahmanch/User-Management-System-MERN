import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const IsLogout=({children}:any)=>{
const user=useSelector((state:any)=>state.auth.userInfo)
if(user){
return <Navigate to='/user/home'/>

}
return children
}
export default IsLogout