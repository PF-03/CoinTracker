

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


import Activos from "./components/ver_mas_activos/ver_mas_activos";


function App() {

  return (
    <div className='App'>
      <Routes>


          <Route path="" element={<LandingNavbar />} />
          <Route path="home" element={<span>hola</span>} />
          <Route path="wallet" element={<Activos/>}/>


          <Route path="/" element={<LandingPage />} />
          
          


          <Route path="/home" element={<Home/>}/>

          <Route path="register" element={<FormRegister/>}/>

          <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
