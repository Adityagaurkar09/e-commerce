import React, { useState } from 'react'
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

  const processSignup = async () => {
   const response = await axios.post (`${process.env.REACT_APP_API_URL}/signup`)
   console.log(response)
  }
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
     val={signupData.password}
     onChange={(val)=>{
      setSignupData({...signupData, password:val})
     }}
     />

<Input
     label={"RePassword"}
     val={signupData.rePassword}
     onChange={(val)=>{
      setSignupData({...signupData, rePassword:val})
     }}
     />
   <div className='flex justify-around'>
     <Button label="Signup" 
     onClick={()=>processSignup()} 
          varient={"primary"}/>

            <Button label="Cancel" 
            onClick={()=>{window.location.href = "/"}}
             varient={"secondary"}/>
   </div>
         </div>
    </div>
  )
}

export default Signup
