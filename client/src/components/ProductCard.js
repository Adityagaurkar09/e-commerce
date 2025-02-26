import React, { useState } from 'react'
import { shortText } from '../utils/common'
import { ChevronLeft as LeftArrow, ChevronRight as RightArrow } from "lucide-react";

function ProductCard({
    name,
    price,
    images,
    shortDescription,
    category,
    tags
}) {
  const [currentImage, setCurrentImage] = useState(images[0]);

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

  return (
    <div className='bg-white shadow-lg rounded-md m-4 px-10 py-5 overflow-hidden max-w-[400px]'>
      <div className='relative'>
        <LeftArrow size={64} className='absolute top-1/3 left-0 ' onClick={leftArrowClick}/>
      <img
       src={currentImage} 
       alt={name} 
       className='w-full h-60 object-containt object-center'/>
       <RightArrow size={64} className='absolute top-1/3 right-0 '   onClick={rightArrowClick}/>
       </div>

     <h1 className='font-bold text-xl'>{shortText(name , 30)}</h1>
     <p className='text-sm'>{shortText(shortDescription, 70)}</p>
    </div>
  )
}

export default ProductCard
