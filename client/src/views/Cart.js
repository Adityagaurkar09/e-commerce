import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Input from '../components/input';
import Button from '../components/Button';

function Cart() {
    const [cart, setCart] = useState([]);
    const [total , setTotal] = useState(0);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [name, setName] = useState('');
    const [adress, setAdress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('  COD');
    
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
     toast.success('Product removed from cart');
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

    const CheckoutDialog = ({isOpen , onClose}) => {
      if (!isOpen) return null;

      return(
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'
         onClick={onClose}>
          <div className='bg-white p-5  rounded-lg w-[250px] '
// e.stopPropagation e use kiya hai q ki parntens pe click karte hai toh dialog close nahi hona chahiye 

          onClick={(e) => e.stopPropagation()}>
          <h2>CheckOut view</h2>

<Input label="name" 
placeholder='enter name'
value={name}
onChange={(value) => setName(value)}
/>

<Input label="adress" 
placeholder='enter adress'
value={adress}
onChange={(value) => setAdress(value)}
/>

<label>Payment Method</label>
<select
value={paymentMethod}
onChange={(e) => setPaymentMethod(e.target.value)}
className='px-2 w-full border border-gray-300 focus:outline-none rounded-md my-3'
>
<option value="COD">Cash on Delivery</option>
<option value="Online">Online</option>
</select>

<div className='flex justify-center '>
<Button label="Complet Order" onClick={onClose} varient="primary"></Button>
</div>
            </div>
        </div>
      )
    }

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
      <div className='flex justify-center items-center '>
        <span className='rext-2xl text-center py-10 mx-10 '>Total Amount : {total}</span>
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded-lg"
          onClick={() => setIsCheckoutOpen(true)}
        >CheckOut 
        </button>
      </div>
      <CheckoutDialog 
      isOpen={isCheckoutOpen} 
      onClose={()=>{setIsCheckoutOpen(false)}}/>
      <Toaster/>
    </div>
  )
}

export default Cart
