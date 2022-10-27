import { useState } from "react";
import "./App.css";
import LandingNavbar from "./components/navbar/LandingNavbar";
import { Routes, Route } from "react-router-dom";

import SearchBar from "./components/SearchBar/SearchBar";

import Home from "./components/home/home"
import LandingPage from "./views/landingPage/landingPage";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>

          <Route path="/" element={<LandingPage />} />
          
          <Route path="wallet" element={<SearchBar/>}/>

          <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
