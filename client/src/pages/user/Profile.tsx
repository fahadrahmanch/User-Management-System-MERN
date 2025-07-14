import React from "react";
import ProfileDiv from "../../components/user/Profile";
import Navbar from "../../components/user/Navbar";
const Profile:React.FC=()=>{
    return(
        <>
        <Navbar/>
        <ProfileDiv/>
        </>
    )
}
export default Profile