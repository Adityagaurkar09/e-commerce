import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './Home.css';

function Home() {
  const [value, setValue] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const reset = () => setValue({ name: '', email: '', phone: '', address: '' });

  const processSubmit = async () => {
    try {
      toast.loading("Please wait...");

      const response = await axios.post("http://localhost:5003/submit", value);
      toast.dismiss(); // 

      toast.success(response.data.message); //  success message dikaenga

      setValue({ name: '', email: '', phone: '', address: '' }); //  reset form

    } catch (error) {
      toast.dismiss();
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    //   console.error("Error:", message);
    }
  };

  return (
    <div className='container'>
      <h1>FORM</h1>
      <form className='form'>
        <label> Name :
          <input
            type='text'
            placeholder='Enter Your Name'
            value={value.name}
            onChange={(e) => setValue({ ...value, name: e.target.value })}
          />
        </label>

        <label> Email :
          <input
            type='text'
            placeholder='Enter Your Email'
            value={value.email}
            onChange={(e) => setValue({ ...value, email: e.target.value })}
            required
          />
        </label>

        <label> Phone Number :
          <input
            type='number'
            placeholder='Enter Your Phone Number'
            value={value.phone}
            onChange={(e) => setValue({ ...value, phone: e.target.value })}
            required
          />
        </label>

        <label> Address :</label>
        <textarea
          placeholder='Address'
          value={value.address}
          onChange={(e) => setValue({ ...value, address: e.target.value })}
        />

        <div className='btn'>
          <button type='button' className='submit' onClick={processSubmit}>Submit</button>
          <button type='button' className='reset' onClick={reset}>Reset</button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default Home;
