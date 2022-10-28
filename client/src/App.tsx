

import './App.css';
import { Login } from './components/login/Login';
import { Routes, Route } from 'react-router-dom';
import { useState } from "react";
import LandingNavbar from "./components/navbar/LandingNavbar";
import Sidebar from "./components/Sidebar/Sidebar";
import SearchBar from "./components/SearchBar/SearchBar";
import Home from "./components/home/home"
import LandingPage from "./views/landingPage/landingPage";
import FormRegister from './components/FormRegister/FormRegister'



function App() {

  return (
    <div className='App'>
      <Routes>


          <Route path="/" element={<LandingPage />} />
          
          <Route path="wallet" element={<SearchBar/>}/>

          <Route path="/home" element={<Home/>}/>

          <Route path="register" element={<FormRegister/>}/>

          <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
