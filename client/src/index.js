import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import NotFound from './views/404';
import './index.css';
import Dashboard from './views/Dashboard';
import UserOrder from './views/UserOrder';
import Cart from './views/Cart';
import Navbar from './views/Navbar';



const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path : "/",
    element:<Home/>,
  },
  {
    path : "/login",
    element:<Login/>,
  },
  {
    path : "/signup",
    element:<Signup/>,
  },
  {
    path : "/Dashboard",
    element:<Dashboard/>,
  },
  {
    path : "/userorders",
    element:<UserOrder/>,
  },
  {
    path : "/user/cart",
    element:<Cart/>,
  },
  {
    path : "*",
    element:<NotFound/>,
  },
  {
    path : 'navbar',
    element:<Navbar/>,
  }
  
])

root.render(<div className='bg-zinc-100 min-h-screen'> 
<RouterProvider router={router}/>
 </div>) ;

                                  
                                  