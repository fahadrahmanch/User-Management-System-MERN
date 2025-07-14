import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:0
}

const CounterSlice=createSlice({
    name:"counterApp",
    initialState,
    reducers:{
        increment:(state)=>{
            state.value+=1
        },
        decrement:(state)=>{
            state.value-=1
        }
    }

})
export const {increment,decrement}=CounterSlice.actions
export default CounterSlice.reducer