import React from "react";
import { useDispatch  } from "react-redux";
import { logout } from "../../features/Slices/authSlice";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Navbar:React.FC=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handlelogout=async()=>{
    await API.get('/user/logout',{
        withCredentials: true,
    })
    dispatch(logout())
    }
    const Profile=()=>{
        navigate("/user/profile")
    }
    const Home=()=>{
        navigate("/user/home")
    }
    return(
        <>
        <nav className="h-[80px] bg-white shadow flex justify-between items-center px-6">
          <h1 className="text-xl font-bold text-gray-800 cursor-pointer" onClick={Home}>
            USER MANAGEMENT MERN
          </h1>
      
          <div className="flex items-center gap-6">
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handlelogout}>
              Logout
            </button>
           
            <img
              src="https://via.placeholder.com/60"
              alt="User"
              className="w-14 h-14 rounded-full object-cover shadow cursor-pointer"
              onClick={Profile}
            />
          </div>
        </nav>
      </> 
    )
}
export default Navbar