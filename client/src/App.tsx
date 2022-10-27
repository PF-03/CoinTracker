import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import LandingNavbar from "./components/navbar/LandingNavbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route path="/">
          {/* ejemplos de como usar en react router dom, se deb cambiar lo que esta dentro del element */}
          <Route path="" element={<LandingNavbar />} />
          <Route path=":params" element={<Sidebar />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
