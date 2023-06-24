
import "../App.css";
import bgImage from '../assets/fli.jpg';
import {Link} from 'react-router-dom';
import "tailwindcss/tailwind.css";
import React, { useState } from 'react';
import firebase from '../firebase'; 
import { auth } from "../firebase";
import { sendPasswordResetEmail} from 'firebase/auth';
import {MdOutlineFlightTakeoff } from "react-icons/md";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth,email)
    .then((userCredential) => {
        console.log('Password reset email sent. Check your inbox.');
        
      })
      .catch((error) => {
        console.error('sent failed:', error);
      });
  };


  return (
<div className="bg-[#282a35]">
    <header className="bg-[#a7abc2]  ">
      <div className="container mx-auto py-4 px-5 flex items-center">
      
        <h1 href="/" className="text--[#282a35] font-bold text-3xl">Bookfly</h1>
        <MdOutlineFlightTakeoff className="text-3xl mr-4 ml-4"></MdOutlineFlightTakeoff>
        
       
      </div>
    </header>

    <div
    className="h-screen flex justify-center items-center bg-cover"
    style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "100% 100%",
    backgroundPosition: "center"}}
  >
    <div className="bg-white bg-opacity-70 shadow-xl rounded-lg w-80 animate__animated animate__fadeInDown">
      <div className="py-4 px-8">
        <h1 className="text-2xl font-bold mb-3">Forget Password</h1>
        
          <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                Enter Mail
              </label>
              <input
                className="border rounded-md py-2 px-3 text-gray-700 w-full"
                type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
              />
          </div>
          
          <button onClick={handleResetPassword}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-3 w-full animate__animated animate__pulse animate__infinite"
            type="submit"
          >
            Send Reset Email
          </button>
          
              
          <Link to="/"><a className="text-blue-500 hover:text-blue-700" href="#create-account">
                  Back to Login
                </a></Link>
            
          
        </div>
      </div>
    </div></div>
  );
}

export default ForgotPassword;
