import React from 'react'

function Navbar() {
  return (
    <div>
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-lg font-bold">MyApp</div>
            <ul className="flex space-x-12">
                <li><a href="/" className="text-white hover:text-gray-300">Home</a></li>
               
                <li><a href="/dashboard" className="text-white hover:text-gray-300">Dashboard</a></li>
                <li><a href="/userorders" className="text-white hover:text-gray-300">User Orders</a></li>
                <li><a href="/user/cart" className="text-white hover:text-gray-300">Cart</a></li>
                <li><a href="/signup" className="text-white hover:text-gray-300">Signup</a></li>

            </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
