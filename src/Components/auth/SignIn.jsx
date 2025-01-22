// SignIn.js
import React, { useState, useRef } from 'react';
import { Link} from 'react-router-dom';
import myImage from '../../assets/Designer (2).jpeg'
import  '../../assets/styles/Signin.css'
import Dashboard from '../dashboard/Dashboard';
const BASE_URL = "http://localhost:3500"
const SignIn = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidated, setIsValidated] = useState(false)
  const linkRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = () => {
    if (linkRef.current) {
      linkRef.current.click();
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const user = {
      password: password,
      email: email,

    }
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      
      // Assuming the backend returns a token or success status
      if (response.ok) {
        // For example, store token in localStorage or a session management system
        localStorage.setItem('token', data.token);  // Assuming token is returned

        // Redirect to the Dashboard
        window.location.href = '/dashboard';
      } else {
        setErrorMessage(data.message); // Display error message from backend
      }
    } catch (error) {
      setErrorMessage('Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <div className='flex1'>
      <Link ref={linkRef} to='/Dashboard'></Link>
    {/* <img src={myImage} alt="" className='myImage'/> */}
    <div className=" ml-40 text-white max-w-md p-10 bg-customBlue bg-opacity-20 backdrop-blur-lg border border-gray-900 border-opacity-10 rounded-md shadow-md ">
      <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
      <form onSubmit={handleSignIn} className='w-60'>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
        </div>
        <button type="submit" className="w-full cursor-pointer py-2 px-4 bg-customBlue transition-all duration-100 ease-in-out text-white rounded-md hover:text-customBlue hover:bg-white hover:customBlue hover:border-6 hover:border-solid focus:outline-none focus:bg-customBlue">
          Sign In
        </button>
      </form>
      <p className="mt-4">
        Don't have an account? <Link to="/signup" className="text-customBlue hover:underline hover:text-white">Sign Up</Link>
      </p>
    </div>
    </div>
  );
};

export default SignIn;
