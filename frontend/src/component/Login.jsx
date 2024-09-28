import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);  // Toggle between login and signup
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log("Form data:", { email: userId, password });
      const endpoint = isSignup ? 'https://blog-open-ai-jqd1.vercel.app/api/user/signup' : 'https://blog-open-ai-jqd1.vercel.app/api/auth/login';  // Change the endpoint based on form type
      const response = await axios.post(endpoint, { email: userId, password });
      
      if (response) {
        console.log(response.data)
        console.log(`Token = ${response.data.token}`)
        // Store the JWT token in local storage or session storage
        sessionStorage.setItem('token', response.data.token);
        setToken(response.data.token);  // Save token in state
        setErrorMessage('');  // Clear error message if login/signup is successful
        window.location='/'
        alert('Authentication successful!');
        Navigate('/');
      }
    } catch (error) {
      console.log(error.message);
      
    }
  };

  return (
    <div className='flex justify-center mt-20'>
      <div className='flex flex-row w-max h-2/5'>
        {/* Welcome Section */}
        <div className='bg-blue-900 shadow rounded-l-lg flex flex-col text-center justify-center'>
          <h1 className='text-2xl px-3 font-semibold text-white'>
            Welcome to Blog Website
          </h1>
        </div>

        {/* Login/Signup Form */}
        <div className='max-w-md w-full bg-white rounded-r-lg shadow-sm p-6'>
          <h2 className='text-2xl font-bold text-center text-blue-700 mb-1'>
            {isSignup ? 'Sign Up' : 'Login'}
          </h2>
          <p className='text-sm text-center text-blue-900 mb-8'>
            Please {isSignup ? 'Sign Up' : 'Login'} to continue
          </p>
          
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className='mb-4'>
              <label htmlFor='userId' className='block text-blue-800 text-lg font-bold mb-2'>
                Email ID
              </label>
              <div className='relative'>
                <input 
                  type='email' 
                  id='userId' 
                  required 
                  placeholder='xxx@gmail.com' 
                  value={userId} 
                  onChange={(e) => setUserId(e.target.value)} 
                  className='border rounded px-3 py-2 w-full'
                />
              </div>
            </div>

            {/* Password Input */}
            <div className='mb-6'>
              <label htmlFor='password' className='block text-blue-800 text-lg font-bold mb-2'>
                Password
              </label>
              <input 
                type='password' 
                id='password' 
                required 
                placeholder='********' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className='border rounded px-3 py-2 w-full'
              />
            </div>

            {/* Submit Button */}
            <div className='flex items-center justify-center'>
              <button type='submit' className='bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:shadow-outline'>
                {isSignup ? 'Sign Up' : 'Login'}
              </button>
            </div>

            {/* Error Message Display */}
            {errorMessage && (
              <div className='text-red-500 text-sm mt-4'>
                <p>{errorMessage}</p>
              </div>
            )}
          </form>

          {/* Toggle between Login and Signup */}
          <div className='text-center mt-6'>
            <p className='text-blue-700 cursor-pointer' onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
