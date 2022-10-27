import { useState } from "react";
import "./App.css";
import LandingNavbar from "./components/navbar/LandingNavbar";
import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import SearchBar from "./components/SearchBar/SearchBar";
=======
import Home from "./components/home/home"
>>>>>>> ada8489a5a62ed16f88bf8325afc743ff68ad9b2

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route path="/">
<<<<<<< HEAD
          <Route path="" element={<LandingNavbar />} />
          <Route path="home" element={<span>hola</span>} />
          <Route path="wallet" element={<SearchBar/>}/>
=======
          <Route path="/nav" element={<LandingNavbar />} />
          <Route path="/home" element={<Home/>}/>
>>>>>>> ada8489a5a62ed16f88bf8325afc743ff68ad9b2
        </Route>
      </Routes>
    </div>
  );
}

export default App;
