import Navbar from "../../components/user/Navbar";
import React from "react";
import HomeDiv from "../../components/user/HomeDiv";
const Home:React.FC=()=>{
 

    return(
        <>
        <Navbar/>
        <div>
        <HomeDiv/>
        </div>
        </>
    )
}
export default Home