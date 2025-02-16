import React, { useEffect,useState } from 'react'
import { getCurrentUser, getReadableTimeStamp, jwtToken } from '../utils/common';
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
        },3000);
      }
    },[])

    //jb jb user change honga tb tb useEffect triger honga
    // agr user hai to loadUSer order ko call kiya jaenga
    useEffect(()=>{
      if(user){
        loadUserOrder();
      }
    },[user])

    const [isDialogOpen , setIsDialogOpen] = useState(false);
    const [selectOrder , setSelectOrder] = useState({});

    console.log(selectOrder);

    const OrderViewDialog = ({isOpen , onClose}) => {
      if(!isOpen){
        return null;
      }
      const {_id,products, totalBill, delivaryAdress,phone, paymentMethod, status, createdAt} = selectOrder;

      return(
     <div className='min-h-screen bg-gray-400  fixed top-0 left-0 w-full bg-opacity-75 z-50 justify-center items-center flex 'onClick={onClose}>
      <div className='bg-white w-1/2 min-h-96 rounded-md px-5 py-2'onClick={(e)=>e.stopPropagation()}>
      <button className='text-red-500'onClick={onClose}>Close</button>
      <h1>Order details</h1>
      <p> Order Id : {_id}</p>
      <p> Order On : {getReadableTimeStamp(createdAt)}</p>
      <p> totalBill Amount : {totalBill}</p>
      <p> Payment Mode : {paymentMethod}</p>
      <p> Phone : {phone}</p>
      <p> Delivary Adress : {delivaryAdress}</p>
      <p> Status : {status}</p>

      {products.map((product)=>{
        const {productId, quantity, price, } = product;
        const {name, images} = productId;

        return(
          <div> 
          <img src={images} alt={name} className='w-20 h-20'/>
          <p>{name}</p>
          </div>
      )
      })}
      </div>
      </div>
      )
    }
  return (
    <div>
      <h1> order</h1>
      <p> current user: {user.name}-{user.email}-{user.role}</p>
      <div>
        {orders.map ((order)=>{
          return <OrderCard key={order._id} 
          order={order} 
          onClick={() =>{
            setSelectOrder(order);
            setIsDialogOpen(true);

          }} 
          />
        })}
      </div>
      <OrderViewDialog isOpen={isDialogOpen} onClose={ () =>{
        setIsDialogOpen(false);
        setSelectOrder({});
      }} />
    </div>
  )
}

export default UserOrder
