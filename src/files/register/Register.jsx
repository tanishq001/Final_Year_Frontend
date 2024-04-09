import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom"
import Navbar from '../navbar/Navbar';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const userNameRef = useRef();
  const navigate=useNavigate()
  const sendRequest = async () => {
    // add your api endpoint for login 
    console.log(userName,password)
  try {
    const response = await fetch(`http://localhost:8000/api/register?username=${userName}&email=${email}&password=${password}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName, email, password }),
    });

    if(response.ok){
      console.log(response.body);
      console.log("Login Accepted");
      navigate('/home');
    }
    else
    {
      console.log('Login failed invalid username or password');
    }
  } 
  catch(error) {
    console.error('Error :',error)
  }
  };

  const handleStart = () => {
    setUserName(userNameRef.current.value);
    setEmail(emailRef.current.value);
    setPassword(passwordRef.current.value);
    sendRequest();
  }


  return (
    <>
    <div className="bg-black min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full px-6 py-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Get To know your emotions</h1>
          <h2 className="text-xl font-semibold text-white">Ready to roll?</h2>
          <p className="text-white">Enter your email to create or register</p>
        </div>
        <div className='bg-gray-800 rounded-lg shadow-lg p-8'>
        <h2 className="text-2xl mb-4 font-semibold text-white text-center">Sign Up</h2>
        <div className='space-y-4'>
        <div className="flex flex-col gap-4 items-center">
            <input
              type="username"
              placeholder="User Name"
              ref={userNameRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
            />
            <input
              type="email"
              placeholder="Email Address"
              ref={emailRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
            />
            <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
            />

            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleStart}
            >
              Get Started
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>

    </>
  );
}
