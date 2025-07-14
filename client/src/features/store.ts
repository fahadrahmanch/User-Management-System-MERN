import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import adminAuth from "./Slices/adminAuth";
import CounterSlice from "./Slices/CounterSlice";
const store=configureStore({
    reducer:{
    auth:authSlice,
    adminAuth:adminAuth,
    CounterSlice:CounterSlice
    }
},

)
export default store