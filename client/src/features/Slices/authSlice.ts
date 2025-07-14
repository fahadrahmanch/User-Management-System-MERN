import { createSlice } from "@reduxjs/toolkit";
import API from "../../api/axios";
const initialState={
userInfo:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")as any):null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
        state.userInfo = action.payload;
        localStorage.setItem("userInfo",JSON.stringify(action.payload))
        },
        logout:(state)=>{
            state.userInfo=null
            localStorage.removeItem('userInfo')
            API.get("/user/logout", { withCredentials: true })
            .finally(() => {
                window.location.href = "/user/login";
            });
           
        }
    }
})
export const {setCredentials,logout}=authSlice.actions
export default authSlice.reducer