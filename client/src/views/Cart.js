import React, { useEffect, useState } from 'react'

function Cart() {
    const [cart, setCart] = useState([]);
    const [total , setTotal] = useState(0);
    
    const loadCart = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')|| '[]');
    setCart(storedCart);
    }

    const removeItemFromCart = (productId) => {
     const indexOfProduct = cart.findIndex((product)=> product.productId === productId);

     if(indexOfProduct > -1){
      cart.splice(indexOfProduct,1);
      localStorage.setItem('cart', JSON.stringify(cart));
      loadCart();
     }
    }
    
    useEffect(() => {
      let totalValue = 0;
      
      cart.forEach((product)=>{
        totalValue += product.price * product.quantity;
    });
    setTotal(totalValue);
  }, [cart]);

    useEffect(() => {
        loadCart();
    }, []);

  return (
    <div>
      <h1 className='text-4xl text-center'>views Cart</h1>
      <div className='flex flex-wrap flex-column justify-center '>
        {cart.map((product)=>{
            const{name, image, price, productId, quantity} = product;
            const totalValue = price * quantity;

            return (

                <div className='bg-white shadow-lg m-5 p-5 w-full md:w-2/3 relative roundeed-lg overflow-hidden flex' key={productId}>
                  <img 
                  src={image}
                  alt={name}
                  className='h-40 object-contain object-center '/>
         <div>
                    <h1 className='text-2xl font-bold'>{name}</h1>
                    <p className='text-lg'>{price}</p>
                    <p className='text-lg'>quantity : {quantity}</p>
                    <p className='text-lg'> Total Amount : {totalValue}</p>
                    </div>
                    <button className='absolute top-5 right-5 bg-red-500 text-white px-2 py-1 rounded-md' 
                    onClick={()=>removeItemFromCart(productId)}>
                      Remove</button>
                    </div>
            )
        })}
        </div>
      <div>
        <h1 className='rext-2xl text-center py-10'>Total Amount : {total}</h1>
      </div>
    </div>
  )
}

export default Cart
