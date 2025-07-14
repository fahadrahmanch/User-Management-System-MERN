import { createSlice } from "@reduxjs/toolkit";
const initialState={
    adminInfo:localStorage.getItem("adminInfo")?JSON.parse(localStorage.getItem("adminInfo")as any):null
    }
    
const adminAuth=createSlice({
    name:"adminAuth",
    initialState,
    reducers:{
        setAdminCredentials:(state,action)=>{
         state.adminInfo=action.payload
         localStorage.setItem("adminInfo",JSON.stringify(action.payload))
        },
        adminLogout:(state)=>{
            state.adminInfo=null;
            state.adminInfo=localStorage.removeItem("adminInfo")
            window.location.href = "/admin/login";
        }
    }
})
export const {setAdminCredentials,adminLogout}=adminAuth.actions
export default adminAuth.reducer