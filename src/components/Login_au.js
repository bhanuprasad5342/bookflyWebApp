import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import "../App.css";
import bgImage from '../assets/fli.jpg';
import { Link } from 'react-router-dom';
import {auth} from '../firebase';  
import { signInWithEmailAndPassword } from 'firebase/auth';
import img1 from '../assets/fli.jpg'
import "tailwindcss/tailwind.css";
import {MdOutlineFlightTakeoff } from "react-icons/md";

const Login = () => {

  const [email2, setEmail2] = useState('');
  const [password2, setPassword2] = useState('');
  const [email3, setEmail3] = useState('');
  const [password3, setPassword3] = useState('');
  
  const navigate = useNavigate();


  const handleUserLogin = () => {
    signInWithEmailAndPassword(auth, email2, password2)
      .then((userCredential) => {
        console.log('User login successful:', userCredential);
        navigate('/user');
      })
      .catch((error) => {
        console.error('User login failed:', error);
      });
  };

  const handleAdminLogin = () => {
    // Logic for admin login using email and password
    // You can use the same `signInWithEmailAndPassword` method for admin login as well
    // Replace the placeholders below with actual values


    signInWithEmailAndPassword(auth, email3, password3)
      .then((userCredential) => {
        console.log('Admin login successful:', userCredential);
        navigate('/admin');
      })
      .catch((error) => {
        console.error('Admin login failed:', error);
      });
  };

  const handleEmailChange2 = (e) => {
    setEmail2(e.target.value);
  };

  const handlePasswordChange2 = (e) => {
    setPassword2(e.target.value);
  };
  const handleEmailChange3 = (e) => {
    setEmail3(e.target.value);
  };

  const handlePasswordChange3= (e) => {
    setPassword3(e.target.value);
  };

  return (
    

    <div className="bg-[#282a35]">
    <header className="bg-[#a7abc2]  ">
      <div className="container mx-auto py-4 px-5 flex items-center">
      
        <h1 href="/" className="text--[#282a35] font-bold text-3xl">Bookfly</h1>
        <MdOutlineFlightTakeoff className="text-3xl mr-4 ml-4"></MdOutlineFlightTakeoff>
        
       
      </div>
    </header>
    



    <div className="h-screen flex justify-center items-center bg-cover"
    style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "100% 100%",
    backgroundPosition: "center"}}>
     
     <div className="flex w-full">
        {/* User Login Box */}
        <div className="flex justify-center items-center w-1/2 pr-2">
        <div className="bg-white bg-opacity-70 shadow-xl rounded-lg w-80 animate__animated animate__fadeInDown">
          <div className="py-4 px-8">
            <h1 className="text-2xl font-bold mb-3">User Login</h1>
            
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                  User Mail
                </label>
                <input
                  className="border rounded-md py-2 px-3 text-gray-700 w-full"
                  type="email"
                  
                  id="email"
                  value={email2}
                  onChange={handleEmailChange2}
                  placeholder="Enter your mail"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="border rounded-md py-2 px-3 text-gray-700 w-full"
                  type="password"
                  id="password"
                  value={password2}
                  onChange={handlePasswordChange2}
                  placeholder="Password"
                />
              </div>
              
              <button  onClick={handleUserLogin}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-3 w-full animate__animated animate__pulse animate__infinite"
                type="submit"
              >
                Login As User
              </button>
              <div className="flex justify-between items-center">
              <Link to='/forgot'><a className="text-blue-500 hover:text-blue-700" href="#forgot-password">
                  Forgot Password?
                </a></Link>
                <Link to="/register"><a className="text-blue-500 hover:text-blue-700" href="#create-account">
                Create New Account
                </a></Link>
              </div>
            
          </div>
        </div>
        </div>

        {/* Vertical Line */}
        <div className="w-px bg-gray-300"></div>

        {/* Admin Login Box */}
        <div className="flex justify-center items-center w-1/2 pl-2">
          <div className="bg-white bg-opacity-70 shadow-xl rounded-lg w-80 animate__animated animate__fadeInDown">
            <div className="py-4 px-8">
            <h1 className="text-2xl font-bold mb-3">Admin Login</h1>
            
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="adminUsername">
                  Admin Mail
                </label>
                <input
                  className="border rounded-md py-2 px-3 text-gray-700 w-full"
                  type="email"
                  id="email"
                  value={email3}
                  onChange={handleEmailChange3}
                  placeholder="Enter your mail"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="adminPassword">
                  Admin Password
                </label>
                <input
                  className="border rounded-md py-2 px-3 text-gray-700 w-full"
                  type="password"
                  id="adminPassword"
                  value={password3}
                  onChange={handlePasswordChange3}
                  placeholder="Admin Password"
                />
              </div>
              
              <button onClick={handleAdminLogin}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-3 w-full animate__animated animate__pulse animate__infinite"
                type="submit"
              >
                Login As Admin
              </button>
              <div className="flex justify-between items-center">
              <Link to="/forgot"><a className="text-blue-500 hover:text-blue-700" href="#forgot-password">
                  Forgot Password?
                </a></Link>
                <Link to="/register"> <a className="text-blue-500 hover:text-blue-700" href="#admin-create-account">
                  Create New Account
                </a> </Link>
              </div>
            
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Login;