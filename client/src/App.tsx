import { useState } from "react";
import "./App.css";
import LandingNavbar from "./components/navbar/LandingNavbar";
import { Routes, Route } from "react-router-dom";

import SearchBar from "./components/SearchBar/SearchBar";

import Home from "./components/home/home"

import Activos from "./components/ver_mas_activos/ver_mas_activos";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route path="/">

          <Route path="" element={<LandingNavbar />} />
          <Route path="home" element={<span>hola</span>} />
          <Route path="wallet" element={<Activos/>}/>

          <Route path="/nav" element={<LandingNavbar />} />
          <Route path="/home" element={<Home/>}/>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
