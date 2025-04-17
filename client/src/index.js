import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import Home from './views/Home/Home';
import Details from './views/Details/Details.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter ([
  {
    path:"/",
    element:<Home/>
  } ,
  {
    path:"/Details",
    element:<Details/>
  }
]);
root.render(<RouterProvider router={router}/>);