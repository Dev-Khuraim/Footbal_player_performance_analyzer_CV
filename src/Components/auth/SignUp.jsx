// SignUp.js
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
// base url
const BASE_URL = "http://localhost:3500";
const SignUp = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const [re_enterpassword, setReEnterpassword] = useState('');
const [f_name, setFname] = useState('');

const [errorMessage, setErrorMessage] = useState('');
const signup = []

  const handleSignUp = async (e) => {
    e.preventDefault();
    const user = {
      f_name: f_name,
      email: email,
      password: password,
      videos:[]

    }
    try {
      
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      console.log("this is response:",data)
      
      if (response.ok) {
       
        setEmail('');
        setFname('');
        setPassword('');
        setReEnterpassword('');
        setErrorMessage('');
        window.location.href = '/signin';
      } else {
        console.log("datanotfound")
        setErrorMessage(data.message || "Signup failed");

      }
    } catch (error) {
      console.log(error)
      setErrorMessage('An error occurred during signup. Please try again.');
    }
  };

  return (
    <div className='w-full flex justify-center'>

    <div className='text-white max-w-md p-10 bg-black bg-opacity-20 backdrop-blur-lg border border-gray-900 border-opacity-10 rounded-md shadow-md flex align-middle flex-col'>
      <h2 className='text-2xl font-semibold mb-4'>Sign Up</h2>
      {/* Display error message if there's an issue */}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form  onSubmit={handleSignUp} className='w-60 flex flex-col align-middle'>
      <div className='mb-4'>
          <label htmlFor="Name" className='block mb-1'>Full Name:</label>
          <input
            type="text"
            id="name"
            value={f_name}
            onChange={(e) => setFname(e.target.value)}
            required
            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="email" className='block mb-1'>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="password" className='block mb-1'>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="re-enterPassword" className='block mb-1'>Re-enter Password:</label>
          <input
            type="password"
            id="re-enterPassword"
            value={re_enterpassword}
            onChange={(e) => setReEnterpassword(e.target.value)}
            required
            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black'
          />
        </div>
        <button type="submit" className='w-full cursor-pointer py-2 px-4 bg-customBlue transition-all duration-100 ease-in-out text-white rounded-md hover:text-customBlue hover:bg-white hover:border-orange-400 hover:border-6 hover:border-solid focus:outline-none focus:bg-orange-600'>Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/signin" className="text-customBlue hover:underline hover:text-white">Sign In</Link>
      </p>
    </div>
    </div>
  );
};

export default SignUp;
