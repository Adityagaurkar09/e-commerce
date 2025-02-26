import React, { useEffect , useState } from 'react'
import toast , { Toaster } from 'react-hot-toast';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {

    try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/product?limit=2&search=`);
    setProducts(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    loadProducts();
  }, [])

  return (
    <div>
      Home
      <div className='flex flex-wrap justify-center'>
      {products.map((product) => {
        return <ProductCard key={product._id} {...product} />
      })}
       </div>
      <Toaster/>  
    </div>
  )
}

export default Home
