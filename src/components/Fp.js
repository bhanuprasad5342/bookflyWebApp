import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { sendPasswordResetEmail} from 'firebase/auth';


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
    <div>
      <h1>Forgot Password</h1>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />
      </div>
      <button onClick={handleResetPassword} type="submit">Send Reset Email</button>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <Link to="/login">Back to Login</Link>
    </div>
  );
};

export default ForgotPassword;