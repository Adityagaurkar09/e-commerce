import React, { useEffect,useState } from 'react'
import { getCurrentUser, jwtToken } from '../utils/common';
import toast from 'react-hot-toast';
import axios from 'axios';

 function UserOrder() {
    const [user , setUser] = useState({});
    const [orders , setOrders] = useState([]);

    const loadUserOrder =async ()=>{
      //user ki id nahi hai to hm user ki id nhi dhund skty
      if(!user?._id){
        return
      }
      try {
          // agr id hai to order ki api call kro
        const orders = axios.get(`${process.env.REACT_APP_API_URL}/order/user/${user._id}`,
        // jwtToken chahie es lie
        {
          headers: {
            Authorization: jwtToken(),
          },
        }
      );
        setOrders(orders.data);
      }
      catch (error) {
        toast.error(error.data.message);
    } }

    useEffect(()=>{
     const user = getCurrentUser();
        setUser(user);
        if(user){
            setUser(user)
        }
        else{
        toast.error("Please login to access this Page")
        setTimeout(() => {
            window.location.href = "/login";
        },3000);}
    },[])

    //jb jb user change honga tb tb useEffect triger honga
    // agr user hai to loadUSer order ko call kiya jaenga
    useEffect(()=>{
      if(user){
        loadUserOrder();
      }
    },[user])
  return (
    <div>
      <h1> order</h1>
      <p> current user: {user.name}-{user.email}</p>
    </div>
  )
}

export default UserOrder
