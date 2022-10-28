import { useState } from "react";
import "./App.css";
import LandingNavbar from "./components/navbar/LandingNavbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import DetailsActivs from "./components/details-activs/detailsActivs";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route path="/nav" element={<LandingNavbar />} />
          <Route path="/home" element={<Home />} />
          <Route path="/crypto/:nameActi" element={<DetailsActivs />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
