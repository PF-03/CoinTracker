import { useState } from "react";
import "./App.css";
import LandingNavbar from "./components/navbar/LandingNavbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home"
import LandignPage from "./views/landingPage/landingPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandignPage />} />
      </Routes>
    </div>
  );
}

export default App;
