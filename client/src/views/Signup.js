import React, { useState } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import Input from '../components/input.js'
import Button from '../components/Button.js'
import axios from 'axios'
function Signup() {

  const [signupData, setSignupData] = useState({
  name: '',
  email: '',
  password: '',
  rePassword: '',
  phone: '',
  adress: ''
  })

  const [error, setError] = useState("")

     const processSignup = async () => {
          toast.loading("Please wait...")
          try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`,signupData)
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
            setError(error.data?.message)
            toast.error(error.data?.message)
          }}
  
  return (
    <div className='bg-blue-200 w-full h-screen flex flex-col items-center justify-center '>
      <h1 className='text-3xl'>Signup</h1>

      <div className='bg-white w-[400px] h-[600px] rounded-2xl shadow-lg hover:shadow-xl px-4 py-6 my-5' >
        
     <Input
     label={"Name"}
     val={signupData.name}
     onChange={(val)=>{
      setSignupData({...signupData, name:val})
     }}
     />

<Input
     label={"Email"}
     val={signupData.email}
     onChange={(val)=>{
      setSignupData({...signupData, email:val})
     }}
     />
   

<Input
     label={"Phone"}
     val={signupData.phone}
     onChange={(val)=>{
      setSignupData({...signupData, phone:val})
     }}
     />

<Input
     label={"Adress"}
     val={signupData.adress}
     onChange={(val)=>{
      setSignupData({...signupData, adress:val})
     }}
     />

<Input
     label={"Password"}
     type='password'
     val={signupData.password}
     onChange={(val)=>{
      setSignupData({...signupData, password:val})
     }}
     />

<Input
     label={"RePassword"}
     type='password'
     val={signupData.rePassword}
     onChange={(val)=>{
      setSignupData({...signupData, rePassword:val})
     }}
     />

<p>{error}</p>     

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
