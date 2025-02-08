import React,{useEffect,useState} from 'react'
import {getCurrentUser , logout , UserDetailRow} from "../utils/common.js"
import {Mail as MailIcon, IdCard as NameIcon , Lock as RoleIcon, LogOut as LogOutIcon, User} from 'lucide-react'
import toast,{Toaster} from 'react-hot-toast'

function Dashboard() {
  const [user , setUser] = useState({
    name: "",
    email: "",
    role:""
  })
  
  useEffect(() => {
    const user = getCurrentUser();

    if(user){
    setUser(user)
  }}, [])

  return (
    <div>
        <h1 className='text-center my-4 text-2xl'>dashboard</h1>
<div className='bg-white w-[500px] mx-auto rounded-lg shadow-lg p-2' >
       <UserDetailRow icon={<NameIcon/>} value={user?.name}/>
       <UserDetailRow icon={<MailIcon/>} value={user?.email}/>
        <UserDetailRow icon={<RoleIcon/>} value={user?.role}/>
        <button type='button' className='bg-blue-500 text-white px-2 p-1 rounded-lg mt-3 inline '
        onClick={()=>{
          toast.success("Logging out")
          logout();
        }}>LogOut<LogOutIcon/></button>
        </div>
        <Toaster/>
    </div>
  )
}

export default Dashboard
