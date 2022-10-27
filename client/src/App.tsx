import { useState } from "react";
import "./App.css";
import LandingNavbar from "./components/navbar/LandingNavbar";
import { Routes, Route } from "react-router-dom";

import SearchBar from "./components/SearchBar/SearchBar";

import Home from "./components/home/home"

import FormRegister from './components/FormRegister/FormRegister'


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route path="/">

          <Route path="" element={<LandingNavbar />} />
          <Route path="home" element={<span>hola</span>} />
          <Route path="wallet" element={<SearchBar/>}/>

          <Route path="/nav" element={<LandingNavbar />} />
          <Route path="/home" element={<Home/>}/>

          <Route path="register" element={<FormRegister/>}/>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
