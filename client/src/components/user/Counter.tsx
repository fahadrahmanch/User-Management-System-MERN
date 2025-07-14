import { useDispatch,useSelector } from "react-redux"
import { decrement,increment } from "../../features/Slices/CounterSlice"
const Counter=()=>{
const state=useSelector((state:any)=>state.CounterSlice)
const dispatch=useDispatch()

    return(
        <>
<h1>{state.value}</h1>
<button onClick={()=>dispatch(increment())} >increment</button>
<button onClick={()=>dispatch(decrement())}>decrement</button>
        </>
    )
}
export default Counter