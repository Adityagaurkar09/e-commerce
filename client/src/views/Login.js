import React, { useEffect, useState } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import Input from '../components/input.js'
import Button from '../components/Button.js'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getCurrentUser } from '../utils/common.js'
// import { set } from 'mongoose'
function Login() {

  const [loginData, setLoginData] = useState({
  email: '',
  password: '',
  })
  
  const [error, setError] = useState("")

     const processLogin = async () => {
          toast.loading("Please wait...")
          
          try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`,loginData)

            localStorage.setItem("e-commerce-user-token", response.data.token)
            localStorage.setItem("e-commerce-user-details", JSON.stringify(response.data.data))

            console.log(response)
            toast.dismiss()
            toast.success(response.data.message)

            setLoginData({
               email: "",
               password: "",
            })
            
           setTimeout(() => {
             window.location.href = "/dashboard"  
           }, 3000);
          }

          catch(error){
               toast.dismiss()
            setError(error.data?.message)
            toast.error(error.data?.message)
          }}
// login user hai ya nahi check karne ke liye 
          useEffect(() => {
            const currentUser = getCurrentUser()
            if(currentUser){
              toast.success("You are already logged in")
              
              setTimeout(() => {
                window.location.href = "/dashboard"
              }, 3000);
            }
          }, [])
  
  return (
    <div className='bg-blue-200 w-full h-screen flex flex-col items-center justify-center '>
      <h1 className='text-3xl'>Login</h1>

      <div className='bg-white w-[400px] h-[600px] rounded-2xl shadow-lg hover:shadow-xl px-4 py-6 my-5' >
        

<Input
     label={"Email"}
     val={loginData.email}
     onChange={(val)=>{
      setLoginData({...loginData, email:val})
     }}
     />
   

<Input
     label={"Password"}
     type='password'
     val={loginData.password}
     onChange={(val)=>{
      setLoginData({...loginData, password:val})
     }}
     />

<p>{error}</p>   
<p>Don't have an acount? {""} <Link to="/signup" className='text-blue-600'>Signup</Link></p>

   <div className='flex justify-around'>
     <Button label="Login" 
     onClick={()=>processLogin()} 
          varient={"primary"}/>

            <Button label="Cancel" 
            onClick={()=>{window.location.href = "/"}}
             varient={"secondary"}/>
   </div>
         </div>
   <Toaster/>
    </div>
  )
}

export default Login
