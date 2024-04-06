import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom"
import Navbar from '../navbar/Navbar';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [register, setRegister] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();



  const handleStart = () => {
    setEmail(emailRef.current.value);
  }

  const handleFinish = () => {
    setPassword(passwordRef.current.value);
  }

  return (
    <>
      <Navbar />
    <div className="bg-black min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full px-6 py-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Get To know your emotions</h1>
          <h2 className="text-xl font-semibold text-white">Ready to roll?</h2>
          <p className="text-white">Enter your email to create or register</p>
        </div>
        <div></div>
        { (
          <div className="flex flex-row items-center">
            {(register && <input
              type="username"
              placeholder="User Name"
              ref={emailRef}
              className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:border-blue-500"
            />)}
            <input
              type="email"
              placeholder="Email Address"
              ref={emailRef}
              className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:border-blue-500"
            />
            <input
            type="password"
            placeholder="Password"
            ref={emailRef}
            className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:border-blue-500"
            />

            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleStart}
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </div>

    </>
  );
}
