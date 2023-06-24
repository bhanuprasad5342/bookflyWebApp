import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login_au';
import Register from './components/Reg_au';
import Forgot from './components/Forgot_p';
import Userpg from './components/Userpg';
import Adminpg from './components/Adminpg';

const App = () => {
  return (
    
    <Router> 
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgot' element={<Forgot/>}/>
        <Route path='/user' element={<Userpg/>}/>
        <Route path='/admin' element={<Adminpg/>}/>
      </Routes>
    </Router> 
    
  );
}

export default App;
