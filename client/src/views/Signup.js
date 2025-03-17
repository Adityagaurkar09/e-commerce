import React, { useEffect,useState } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import Input from '../components/input.js'
import Button from '../components/Button.js'
import {getCurrentUser} from "../utils/common.js"
import axios from 'axios'
import {api} from '../utils/common.js'
import { Link } from 'react-router-dom'
function Signup() {

  const [signupData, setSignupData] = useState({
  name: '',
  email: '',
  password: '',
  rePassword: '',
  phone: '',
  adress: ''
  })

  const [error, setError] = useState("");
  console.log(error)


     const processSignup = async () => {
          toast.loading("Please wait...")
                 toast.dismiss()
            
          try{
            const response = await api.post(`/signup`,signupData)
            console.log(response)
 
            toast.dismiss()
            toast.success(response.data.message)

            setSignupData({
               name: '',
               email: '',
               password: '',
               rePassword: '',
               phone: '',
               adress: ''
            })
           setTimeout(() => {
             window.location.href = "/login"  
           }, 3000);
          }


          catch(error){
               toast.dismiss()
          //   setError(error.data?.message)
          //   toast.error(error.data?.message)
          //   console.log(error)
          const errormessage = error.response.data.message || error.message
          toast.error(errormessage)
          setError(errormessage)

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
      <h1 className='text-3xl'>Signup</h1>

      <div className='bg-white w-[400px] h-[600px] rounded-2xl shadow-lg hover:shadow-xl px-4 py-6 my-5' >
        
     <Input
     label={"Name"}
     val={signupData.name}
     onChange={(val)=>{
      setSignupData({...signupData, name:val})
      setError("")
     }}
     />

<Input
     label={"Email"}
     val={signupData.email}
     onChange={(val)=>{
      setSignupData({...signupData, email:val})
      setError("")
     }}
     />
   

<Input
     label={"Phone"}
     val={signupData.phone}
     onChange={(val)=>{
      setSignupData({...signupData, phone:val})
      setError("")
     }}
     />

<Input
     label={"Adress"}
     val={signupData.adress}
     onChange={(val)=>{
      setSignupData({...signupData, adress:val})
      setError("")
     }}
     />

<Input
     label={"Password"}
     type='password'
     val={signupData.password}
     onChange={(val)=>{
      setSignupData({...signupData, password:val})
      setError("")
     }}
     />

<Input
     label={"RePassword"}
     type='password'
     val={signupData.rePassword}
     onChange={(val)=>{
      setSignupData({...signupData, rePassword:val})
      setError("")
     }}
     />

<p>{error}</p>   
<p>already have an acount? {""} <Link to="/login" className='text-blue-600'>Login</Link></p>

   <div className='flex justify-around'>
     <Button label="Signup" 
     onClick={()=>processSignup()} 
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

export default Signup
