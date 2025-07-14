import React, { useEffect, useState} from "react"
import API from "../../api/axios"
import { toast } from "react-toastify";
import Edit from "./Edit";
// import { X } from 'lucide-react'
import { adminLogout } from "../../features/Slices/adminAuth";

import AddUser from "./AddUser";
import { useDispatch } from "react-redux";
const DashboardDiv:React.FC=()=>{
    const [users,setUsers]=useState<any[]>([])
    const [showDeleteConfirm, setShowDeleteConfirm]=useState<boolean>(false)
    const [EditModal,setEditModal]=useState(false)
    const[EditUser,setEditUser]=useState<any>(null)
    const [deleteID,setDeleteID]=useState(null)
    const [addModal,setAddModal]=useState(false)
    const [search,setSearch]=useState('')
    const dispatch=useDispatch()
    useEffect(()=>{
    const fecthUsers=async()=>{
    try{
      const res=await API.get("/admin/users")
      console.log("sf ",res.data.users)
      setUsers(res.data?.users)
    }
    catch(error){
        console.log(error)
    }
    }
    fecthUsers()
    },[])

   const editModal=async (userId:string)=>{
    console.log(userId)
    setEditModal(true)
    const user=await users.find((item:any)=>item._id==userId)
    setEditUser(user)
    // console.log("h",h)
    // setEditUser(user)

   }
   
   const deleteUser=async(id:any)=>{
    setDeleteID(id)
   
    setShowDeleteConfirm(true)
    

   }
   const confirmDelete=async()=>{
    setShowDeleteConfirm(false)
     
    try{
        await API.post(`/admin/user/${deleteID}`)
        setUsers((prev)=>prev.filter((item)=>item._id!=deleteID))
        toast.success("user delete successfull")
        setDeleteID(null)

    }
    catch(err){
        console.log(err)

    }
   }

   const cancelDelete=()=>{
    setShowDeleteConfirm(false)
    setDeleteID(null)
   }
   const Logout=()=>{
    dispatch(adminLogout())
   }

    return(
        <>

  
        <nav className="h-[80px] bg-white shadow flex justify-between items-center px-6">
          <h1 className="text-xl font-bold text-gray-800 cursor-pointer" >
            Admin Dashboard
          </h1>
      
          <div className="flex items-center gap-1">
         
    <input className="shadow-md p-2 border border-black" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="search"></input>

            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 " onClick={()=>setAddModal(true)}>Add user</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={Logout} >
              Logout
            </button>
           
         
          </div>
        </nav>
      
      {/* //delete modal*/}

      {showDeleteConfirm&& 
 <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white shadow-md rounded-lg p-6 w-64">
          <p className="text-center text-lg font-semibold mb-4">Are you sure?</p>
          <div className="flex justify-between ">
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={confirmDelete}>Yes</button>
            <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={cancelDelete}>No</button>
          </div>
        </div>
      </div>
      }

   
   {/* delete modal end  */}


   {/* Edit modal */}

{EditModal&&
   <Edit editUser={EditUser} setEditModal={setEditModal} setUsers={setUsers} users={users}/>
}

{/* edit modal end  */}
{addModal&& <AddUser setAddModal={setAddModal} setUsers={setUsers} />}
          
{/* add modal  */}

{/* end add modal */}


        <div className="flex justify-center px-12">

        <table className="w-full text-center  border-collapse mt-[20px] ">
        <thead className="bg-gray-200 ">
     <tr>
    <th className="px-6 py-3">NO</th>
    <th className="px-6 py-3">Profile</th>
    <th className="px-6 py-3">Name</th>
    <th className="px-6 py-3">Email</th>
    <th className="px-6 py-3">Actions</th> 
  </tr>
  </thead>
  <tbody className="">
    {users.filter((item)=>item.name.includes(search.toLowerCase())||item.email.includes(search.toLowerCase())).map((item ,index)=>(
  <tr className="border-b" key={item._id}>
    <td  className="px-6 py-3">{index+1}</td>
    <td className="px-6 py-3 flex justify-center"> 
        <img src={item?.imageUrl}
              alt="User"
              className="w-10 h-10 rounded-full object-cover shadow cursor-pointer flex justify-center"

            //   onClick={Profile}
            /></td>
    <td className="px-6 py-3">{item?.name}</td>
    <td className="px-6 py-3">{item?.email}</td>
    <td className="px-6 py-3 "><button className="bg-blue-500 rounded p-2 mr-1" onClick={()=>editModal(item._id)}>edit</button><button className="bg-red-500 rounded p-2" onClick={()=>deleteUser(item._id)}>delete</button></td>
  </tr>
))}
  </tbody>
        </table>
        </div>
      </> 
    )
}
export default DashboardDiv