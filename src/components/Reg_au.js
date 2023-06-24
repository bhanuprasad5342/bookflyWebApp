import React, { useState } from 'react';
import "../App.css";
import bgImage from '../assets/fli.jpg';
import {Link} from 'react-router-dom';
import "tailwindcss/tailwind.css";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase'; 
import img1 from '../assets/fli.jpg'
import {MdOutlineFlightTakeoff } from "react-icons/md";
const EmailInput = ({ email, setEmail }) => {
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                  E-Mail
                </label>
                <input
                  className="border rounded-md py-2 px-3 text-gray-700 w-full"
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your mail"
                />
              </div>
  );
};



const PasswordInput = ({ password, setPassword}) => {
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

 

  return (
    <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                  Password
                </label>
                <input
                  className="border rounded-md py-2 px-3 text-gray-700 w-full"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter Password"
                />
              
    </div>
  );
};








const Reg_au = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User registration successful, do something with userCredential
        console.log('Registration successful:', userCredential);
        
        // Reset the form after successful registration
        setEmail('');
        setPassword('');
        
      })
      .catch((error) => {
        // User registration failed, handle error
        console.error('Registration failed:', error);
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
    <div className="h-screen  items-center bg-cover"
    style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "100% 100%",
    backgroundPosition: "center"}}>
       <div className="flex justify-center items-center h-screen bg-cover">
        <div className="bg-white bg-opacity-70 shadow-xl rounded-lg w-80 animate__animated animate__fadeInDown">
          <div className="py-4 px-8">
            <h1 className="text-2xl font-bold mb-3">Registration</h1>
            
            <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput
            password={password}
            setPassword={setPassword}
           
          />
             
              <button onClick={handleRegister}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-3 w-full animate__animated animate__pulse animate__infinite"
                type="submit"
              >
                Register
              </button>
              <div className=" items-center">
                
                <Link to="/"><a className="text-blue-500 hover:text-blue-700" href="#create-account">
                  Login to your account
                </a></Link>
              </div>
            
          </div>
        </div>
        </div>
        </div>
       </div>
    
  );
} 

export default Reg_au;