import "./App.css";
import Login from "./views/login/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./views/home/home";
import LandingPage from "./views/landingPage/landingPage";
import FormRegister from "./views/FormRegister/FormRegister";
import DetailsActivs from "./components/details-activs/detailsActivs";
import Review from "./components/Review/Review";
import Profile from "./components/Profile/profile";
import Activos from "./components/ver_mas_activos/ver_mas_activos";

import Verifiqued from "./components/verifiqued/verifiqued";
import Calculadora from "./components/Calculadora/calculadora";
import SharedLayout from "./views/sharedLayout/SharedLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/" element={<SharedLayout />} >
          /*
          Agregar aquí su ruta cuando terminen de probar
          RECUERDEN NO USAR EL COMPONENTE "SideBar" EN SUS RUTAS, YA ESTÁ IMPLEMENTADAS
          */
          <Route path="/home" element={<Home />} />

          <Route path="/crypto/:nameActi" element={<DetailsActivs />} />

          <Route path="/calculator" element={<Calculadora />} />

          <Route path="/profile" element={<Profile />} />

        </Route>


        <Route path="/review" element={<Review />} />

        <Route path="register" element={<FormRegister />} />

        <Route path="/login" element={<Login />} />

        <Route path="/verifiqued/:token" element={<Verifiqued />} />

      </Routes>
    </div>
  );
}

export default App;
