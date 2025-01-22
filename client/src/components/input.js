import React from 'react'

function Input({label,val,onChange,type="text" , placeholder=""}) {
    const inputId = `input-${label}`
   return (
     <div>
     <label htmlFor={inputId}>{label} </label>
     <input type ={type}
      placeholder={placeholder}
      id={inputId}
      className='px-2 w-full border border-gray-300 focus:outline-none rounded-md'
     value={val} 
     onChange={(e) => onChange(e.target.value)}
     />
     </div>
   )
 }

export default Input
