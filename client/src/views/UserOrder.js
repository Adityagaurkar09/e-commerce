import React, { useEffect,useState } from 'react'
import { getCurrentUser, jwtToken } from '../utils/common';
import toast from 'react-hot-toast';
import axios from 'axios';
import OrderCard from '../components/OrderCard';

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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/order/user/${user._id}`,
        // jwtToken chahie es lie
       
        {
          headers: {
            // Authorization: `Bearer ${jwtToken()}`,
            Authorization: jwtToken(),
          }
        });
        
        setOrders(response.data.data);
      }
      catch (error) {
        toast.error(error.response.data.message);
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
      <p> current user: {user.name}-{user.email}-{user.role}</p>
      <div>
        {orders.map ((order)=>{
          return <OrderCard key={order._id} order={order}/>
        })}
      </div>
    </div>
  )
}

export default UserOrder
