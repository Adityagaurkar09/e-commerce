import React from 'react'

import {getReadableTimeStamp} from '../utils/common.js'


function OrderCard({order, onClick}) {
  const {_id ,status,products, createdAt, totalBill, delivaryAdress} = order;
    // console.log(order);
  return (
    <div className='border p-4 m-4 bg-white-600 rounded-lg' onClick={onClick}>
      <p>Order Id : {_id}, Order On : {getReadableTimeStamp(createdAt)}</p>
      <p className='text-lg font-bold mt-3'>
      {products.map((product)=> product.productId.name).join("")}</p>
      <p> Total Amount :₹{totalBill}</p>
      <p>Delivary Adress :{delivaryAdress}</p>
      <span className='bg-blue-500 rounded-full px-3 py-1 text-white absolute top-2 right-2'>
        {status}</span>
    </div>
  )
}

export default OrderCard
