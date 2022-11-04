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
import SharedLayout from "./views/sharedLayout/SharedLayout";
import Donation from "./components/Donation/donation";


const LandingPage = lazy(() => import("./views/landingPage/landingPage"));
const Login = lazy(() => import("./views/login/Login"));
const Review = lazy(() => import("./components/Review/Review"));
const Home = lazy(() => import("./views/home/home"));
// const Calculator = lazy(() => import("./components/Calculadora/calculadora"));
const FormRegister = lazy(
  () => import("./views/FormRegister/FormRegister")
);
const DetailsActivs = lazy(
  () => import("./components/details-activs/detailsActivs")
);
const Activos = lazy(
  () => import("./components/ver_mas_activos/ver_mas_activos")
);

function App() {
  return (
    <div className="App">
      <Suspense fallback={<>Cargando...</>}>
        {" "}
        {/* al cargar un componente, crearlo aqui y */}
        <RoutesWithNotFound>
          <Route path="/" element={<LandingPage />} />

          <Route path={PrivateRoutes.REVIEW} element={<Review />} />

          <Route path={PublicRouts.REGISTER} element={<FormRegister />} />

          <Route path={PublicRouts.LOGIN} element={<Login />} />

          <Route path={PrivateRoutes.CRYPTO} element={<DetailsActivs />} />
          {/* agregar aqui las rutas privadas para usuarios */}
          <Route element={<AuthGuard />}>
            <Route element={<SharedLayout />}>
              <Route path={PrivateRoutes.HOME} element={<Home />} />

              <Route path={PrivateRoutes.WALLET} element={<Activos />} />

              <Route path={PrivateRoutes.CALCULATOR} element={<Calculadora />} />

              <Route path={PrivateRoutes.USER} element={<Profile />} />

              <Route path={PrivateRoutes.VERIFIQUED} element={<Verifiqued />} />

              <Route path={PrivateRoutes.DONATE} element={<Donation />} />

              <Route element={<AdminGuard />}>
                {/* colocar aqui las pestañas para los admins. 
            Agregar las rutas en src/rutas/rutas.ts como lo estan las demas */}
                <Route
                  path={PrivateAdminRoutes.ADMIN}
                  element={<h1>estamos en admin</h1>}
                />
              </Route>
            </Route>
          </Route>
        </RoutesWithNotFound>
      </Suspense>
    </div>
  );
}

export default App;
