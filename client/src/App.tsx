import "./App.css";
import Login from "./views/login/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import LandingPage from "./views/landingPage/landingPage";
import FormRegister from "./components/FormRegister/FormRegister";
import DetailsActivs from "./components/details-activs/detailsActivs";
import Review from "./components/Review/Review"

import Activos from "./components/ver_mas_activos/ver_mas_activos";
import Calculadora from "./components/Calculadora/calculadora";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/home" element={<Home />} />

        <Route path="/review" element={<Review />} />

        <Route path="/crypto/:nameActi" element={<DetailsActivs />} />

        <Route path="register" element={<FormRegister />} />

        <Route path="/login" element={<Login />} />

        <Route path="/wallet" element={<Activos />} />

        <Route path="/calculadora" element={<Calculadora/>}/>
      </Routes>
    </div>
  );
}

export default App;
