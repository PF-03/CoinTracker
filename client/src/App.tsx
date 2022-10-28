import { useState } from "react";
import "./App.css";
import LandingNavbar from "./components/navbar/LandingNavbar";
import { Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";
import Home from "./components/home/home"
import LandingPage from "./views/landingPage/landingPage";
import FormRegister from './components/FormRegister/FormRegister'



function App() {

  return (
    <div className="App">
      <Routes>

          <Route path="/" element={<LandingPage />} />
          
          <Route path="wallet" element={<SearchBar/>}/>

          <Route path="/home" element={<Home/>}/>

          <Route path="register" element={<FormRegister/>}/>

      </Routes>
    </div>
  );
}

export default App;
