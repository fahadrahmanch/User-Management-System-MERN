import LoginImage from '../../assets/istockphoto-1201545332-612x612.jpg'
import React, { useEffect, useRef, useState } from 'react'
import {validationForLogin} from '../../validationForm/validation'
// import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/Slices/authSlice'
import API from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

const SignIn:React.FC=()=>{
    const [move,setMove]=useState(true)
    const [values,setValues]=useState({name:'',email:'',password:'',confirmPassword:''})
    const [error,setError]=useState<any>({})
    const divRef=useRef<HTMLDivElement>(null)
    const [height ,setHeight]=useState(0)
    const navigate=useNavigate()

    const dispatch=useDispatch()
    const handleChange=(e:any)=>{
       setValues({...values,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e:any)=>{
       e.preventDefault();
       const validationErrors=validationForLogin(values)
        setError(validationErrors)
        console.log(validationErrors)
       if(Object.keys(validationErrors).length>0){
           return
       }

       API.post('/user/login',{
           name:values.name,
           email:values.email,
           password:values.password
       }, {
           headers: {
             'Content-Type': 'application/json',
           }
       }
   )
       .then((res)=>{
         dispatch(setCredentials(res.data))
         toast.success("Login successfull")
         navigate('/user/home')

       })
       .catch((err:any)=>{
        console.log(err)
        toast.error(err.response?.data?.message||"something went wrong");
       })
       
    }
    useEffect(()=>{
       if (divRef.current) {
           const rect = divRef.current.getBoundingClientRect();
           setHeight(rect.height);
         }
    })
   
    return (
<div className={`flex  items-center justify-center  min-h-screen bg-gray-100 px-4 gap-6 transition-all duration-500 ${move ? 'flex-row' :'flex-row-reverse' }`} >
         <div className="hidden md:block w-[300px] transition-transform duration-500 cursor-pointer" onClick={()=>setMove(!move)}>
         <img src={LoginImage} alt="Login Image" className='object-cover rounded-xl  hover:scale-105 transition-transform duration-300' style={{ height:`${height}px`}} />
         </div>
         <div ref={divRef} className='bg-white rounded-xl shadow-md w-full max-w-md p-6 transition-all duration-500'>
         <h2 className="text-xl font-bold mb-4 text-center">Log In</h2>
            <form className='space-y-4 transition-all duration-500'>
                <input onChange={handleChange} value={values.email} placeholder="Email" name='email'className={`w-full p-3 rounded outline-none 
    ${error.email 
      ? 'border border-red-500' 
      : 'border border-gray-300 focus:ring-2 focus:ring-[#599ac5]'}`}/><br/>
                <p className="text-red-500 text-sm font-medium">{error.email?error.email:''}</p>
                <input onChange={handleChange} type='password' value={values.password} placeholder="Password" name='password' className={`w-full p-3 rounded outline-none 
    ${error.password 
      ? 'border border-red-500' 
      : 'border border-gray-300 focus:ring-2 focus:ring-[#599ac5]'}`} /><br/>
                <p className="text-red-500 text-sm font-medium">{error.password?error.password:''}</p>
    
                <button className='w-full bg-[#599ac5] text-white p-3 rounded button-confirm transition' onClick={handleSubmit}>Confirm </button>
                <p 
        className="text-blue-600 underline cursor-pointer mt-3"
        onClick={() => navigate('/user/signup')} // or '/signup'
      >
        No have an account?
      </p>


            </form>
         </div>
    </div>
    )
}
export default SignIn