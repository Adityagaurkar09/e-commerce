import React from 'react'

function Button({label,onClick,varient}) {

const BTN_STYLES = {
    primary:"bg-blue-500 text-white",
    secondary:"bg-gray-500 text=white",
    tertiary:"bg-red-500 text=white",
    link:"bg-blue-100 text=white",
    disabled:"",
}

  return (
 <button type='button' onClick={onClick}
 className={`px-6 py-1 my-6 rounded-full ${BTN_STYLES[varient]}`}>
    {label}</button>
  )
}

export default Button
