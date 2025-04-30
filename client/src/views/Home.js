import React, { useEffect , useState } from 'react'
import toast , { Toaster } from 'react-hot-toast';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import IconCart from "./../assets/cart.png"
import { Link } from 'react-router-dom';
import {api} from '../utils/common';
import Navbar from './Navbar';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const loadProducts = async () => {

    try {
    const response = await api.get(`/product?limit=10&search=${search}`);
    setProducts(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    loadProducts();
  }, [search])

  return (
    <div>
      <Navbar/>
        {/* <h1 className='text-2xl font-bold'>Product List</h1> */}
      <div className='flex justify-center py-10'>
        <input type='text'
        placeholder='serch products'
        className='border border-gray-200 p-2 w-1/2 rounded-md text-2xl '
        value={search}
        onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      <div className='flex flex-wrap justify-center'>
      {products.map((product) => {
        return <ProductCard key={product._id} {...product} />
      })}
       </div>
       {/* <Link to="/user/cart">
       <img src={IconCart} 
       alt="Shopping cart" 
       className='fixed top-10 right-10 w-16 h-16 cursor-pointer'/>
    </Link> */}
      <Toaster/>  
    </div>
  )
}

export default Home
