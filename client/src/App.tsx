import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthGuard from "./guard/auth.guard";
import { PrivateAdminRoutes, PrivateRoutes, PublicRouts } from "./rutas/rutas";
import { AdminGuard } from "./guard/admin.guard";
import RoutesWithNotFound from "./utils/RoutesWithNotFound";
import { Suspense, lazy } from "react";
import Verifiqued from "./components/verifiqued/verifiqued";
import Profile from "./components/Profile/profile";
import Calculadora from "./components/Calculadora/calculadora";
import AdminView from "./components/admin/AdminView";
import SharedLayout from "./views/sharedLayout/SharedLayout";
import Donation from "./components/Donation/donation";
import Chatbot from "./components/ChatBot/chatBots";

import SwapComponent from "./components/swapComponent/SwapComponent";

import Portfolio from "./components/Portfolio/Portfolio";

import Loading from "./components/styles/loading";
import News from "./views/News/News";

const LandingPage = lazy(() => import("./views/landingPage/landingPage"));
const Login = lazy(() => import("./views/login/Login"));
const Review = lazy(() => import("./components/Review/Review"));
const Home = lazy(() => import("./views/home/home"));
// const Calculator = lazy(() => import("./components/Calculadora/calculadora"));
const FormRegister = lazy(() => import("./views/FormRegister/FormRegister"));
const DetailsActivs = lazy(() =>
  import("./components/details-activs/detailsActivs")
);
const Activos = lazy(() =>
  import("./components/ver_mas_activos/ver_mas_activos")
);

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        {/* al cargar un componente, crearlo aqui y */}
        <RoutesWithNotFound>
          <Route path="/" element={<LandingPage />} />

          <Route path={PublicRouts.REGISTER} element={<FormRegister />} />

          <Route path={PublicRouts.LOG} element={<Login />} />

          <Route path={PublicRouts.LOGIN} element={<Login />} />

          <Route path={PrivateRoutes.REVIEW} element={<Review />} />

          <Route path={PrivateRoutes.VERIFIQUED} element={<Verifiqued />} />
          <Route path="/chat" element={<Chatbot />} />

          <Route element={<SharedLayout />}>
            <Route path={PrivateRoutes.CRYPTO} element={<DetailsActivs />} />
          </Route>

          {/* agregar aqui las rutas privadas para usuarios */}

          <Route element={<AuthGuard />}>
            <Route element={<SharedLayout />}>
              <Route path={PrivateRoutes.HOME} element={<Home />} />

              <Route path={PrivateRoutes.WALLET} element={<Activos />} />

              <Route
                path={PrivateRoutes.CALCULATOR}
                element={<Calculadora />}
              />
              <Route path={PrivateRoutes.PORTFOLIO} element={<Portfolio />} />

              <Route path={PrivateRoutes.NEWS} element={<News />} />

              <Route path={PrivateRoutes.USER} element={<Profile />} />
              <Route path={PrivateRoutes.VERIFIQUED} element={<Verifiqued />} />

              <Route path={PrivateRoutes.SWAP} element={<SwapComponent />} />

              <Route path={PrivateRoutes.DONATE} element={<Donation />} />
            </Route>
            <Route element={<AdminGuard />}>
              {/* colocar aqui las pestañas para los admins. 

            Agregar las rutas en src/rutas/rutas.ts como lo estan las demas */}
              <Route path={PrivateAdminRoutes.ADMIN} element={<AdminView />} />
            </Route>
          </Route>
        </RoutesWithNotFound>
      </Suspense>
    </div>
  );
}

export default App;
