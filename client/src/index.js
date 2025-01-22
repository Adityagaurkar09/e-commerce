import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import NotFound from './views/404';
import './index.css';

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
    path : "*",
    element:<NotFound/>,
  },
])

root.render(
<RouterProvider router={router}/>
  );

                                  
                                  