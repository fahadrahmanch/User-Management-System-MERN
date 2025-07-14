import React,{useState,useRef} from "react";
import { toast } from "react-toastify";
import { validationForLogin } from "../../validationForm/validation";
import { useNavigate } from 'react-router-dom'
import API from "../../api/axios";
import { useDispatch } from "react-redux";
import { setAdminCredentials } from "../../features/Slices/adminAuth";
const Login:React.FC=()=>{
    const divRef=useRef<HTMLDivElement>(null)
    const [values,setValues]=useState({email:'',password:''})
    const [error,setError]=useState<any>({})
  
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleSubmit=async(e:any)=>{
        console.log(values)
        e.preventDefault();
        const validationErrors=validationForLogin(values)
         setError(validationErrors)
    
        if(Object.keys(validationErrors).length>0){
            console.log("handleSubmit")

            return
        }

        await API.post('/admin/login',{
            email:values.email,
            password:values.password
        }, {
            headers: {
              'Content-Type': 'application/json',
            }
        }
    )
        .then((res)=>{
          console.log(res)
         dispatch(setAdminCredentials(res.data))
         toast.success("Sign In successfull")
         console.log("Navigating to dashboard...");
         setTimeout(() => navigate('/admin/dashboard'), 100); 
        })
        .catch((err)=>{
         toast.error(err.response?.data?.message||"something went wrong");
        })
        
     }
     const handleChange=(e:any)=>{
        setValues({...values,[e.target.name]:e.target.value})
     }
 
    return (
        <>
        <div className={`flex  items-center justify-center  min-h-screen bg-gray-100 px-4 gap-6 transition-all duration-500`} >
        
         <div ref={divRef} className='bg-white rounded-xl shadow-md w-full max-w-md p-6 transition-all duration-500'>
         <h2 className="text-xl font-bold mb-4 text-center">Admin</h2>
            <form className='space-y-4 transition-all duration-500'>
                <input onChange={handleChange} value={values.email} placeholder="Email" name='email'
                className={`w-full p-3 rounded outline-none 
${error.email 
      ? 'border border-red-500' 
      : 'border border-gray-300 focus:ring-2 focus:ring-[#599ac5]'}`}/><br/>
                <p className="text-red-500 text-sm font-medium">{error.email?error.email:''}</p>
                <input onChange={handleChange} value={values.password} placeholder="Password" name='password' type="password" className={`w-full p-3 rounded outline-none 
    ${error.password 
      ? 'border border-red-500' 
      : 'border border-gray-300 focus:ring-2 focus:ring-[#599ac5]'}`} /><br/>
                <p className="text-red-500 text-sm font-medium">{error.password?error.password:''}</p>
    
                <button className='w-full bg-[#599ac5] text-white p-3 rounded button-confirm transition' onClick={handleSubmit}>Confirm </button>
            </form>
         </div>
    </div>
        </>
    )
}
export default Login