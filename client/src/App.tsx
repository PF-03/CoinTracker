import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import LandingNavbar from "./components/navbar/LandingNavbar";
import { Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route path="" element={<LandingNavbar />} />
          <Route path="home" element={<span>hola</span>} />
          <Route path="wallet" element={<SearchBar/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
