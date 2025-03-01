import React, { useState } from 'react'
import { shortText } from '../utils/common'
import { ChevronLeft as LeftArrow,
   ChevronRight as RightArrow,
   Plus as PlusIcon,
   Minus as MinusIcon } from "lucide-react";
import Button from './Button'
import toast from 'react-hot-toast';

function ProductCard({
  _id,
    name,
    price,
    currentPrice,
    images,
    shortDescription,
    category,
    tags
}) {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);

  const leftArrowClick = () => {
    const currentIndex = images.indexOf(currentImage);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrentImage(images[newIndex]);
  };

  const rightArrowClick = () => {
    const currentIndex = images.indexOf(currentImage);
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentImage(images[newIndex]);
  };

  //order add to cart krne ke lie
  const handleAddToCart = () => {
     const cart = JSON.parse(localStorage.getItem("cart")) || []; //phle se cart h to usme add krdo nhi to empty array bna do

    const product = {
      productId : _id,
      price : currentPrice,
      name:name,
      image:currentImage,
      quantity : quantity
    }

    let exitingProductIndex = -1;

    cart.forEach ((item,index) => {
      if(item.productId === _id){
        exitingProductIndex = index;
      }
    })
    if(exitingProductIndex > -1){
      cart[exitingProductIndex].quantity = quantity;
    }else{
      cart.push(product);
    }
    localStorage.setItem("cart",JSON.stringify(cart))
    toast.success("Product added to cart")
  };

  return (
    <div className='bg-white shadow-lg rounded-md m-4 px-10 py-5 overflow-hidden max-w-[400px]'>
      <span className='absolute top-0 right-0 bg-blue-500 text-white rounded-2xl px-2 py-1'>{category}</span>
      <div className='relative'>
        <LeftArrow size={64} className='absolute top-1/3 left-0 ' onClick={leftArrowClick}/>
      <img
       src={currentImage} 
       alt={name} 
       className='w-full h-60 object-containt object-center'/>
        <p>
          {tags.map((tag) => {
            return (
              <span className='bg-gray-200 text-gray-600 px-2 py-1 rounded-full mr-2'>
              {tag}
              </span>
            );
          })}
          </p>
       <RightArrow size={64} className='absolute top-1/3 right-0 '   onClick={rightArrowClick}/>
       </div>

     <h1 className='font-bold text-xl'>{shortText(name , 30)}</h1>
     <p className='text-sm'>{shortText(shortDescription, 70)}</p>

     <p className='text-2xl'>
      <del>{price}</del>  <span className='font-bold'>{currentPrice}</span>/-
     </p>
     <div className='flex justify-center'>
      <MinusIcon className='currsor-pointer' onClick={()=>setQuantity(quantity - 1)}/>
      <span className='mx-2'>{quantity}</span>
      <PlusIcon className='currsor-pointer' onClick={()=>setQuantity(quantity + 1)}/>
     </div>
     <div className='flex justify-center'>
     <Button label="add to card" varient="primary" onClick={handleAddToCart }/>
     </div>
    </div>
  )
}

export default ProductCard
