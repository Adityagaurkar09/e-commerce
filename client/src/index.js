import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Home as Homeicon , Camera as Cameraicon} from "lucide-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <>
    <h1 class="text-red-500 font-bold underline">
    Hello world!</h1>
    <Homeicon  size={64}/>
    <Cameraicon size={64}/>
    </>
  );

                                  