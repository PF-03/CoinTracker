import "./App.css";
// import Login from "./views/login/Login";
import { Routes, Route } from "react-router-dom";
// import Home from "./components/home/home";
// import LandingPage from "./views/landingPage/landingPage";
// import FormRegister from "./components/FormRegister/FormRegister";
// import DetailsActivs from "./components/details-activs/detailsActivs";
// import Review from "./components/Review/Review";

// import Activos from "./components/ver_mas_activos/ver_mas_activos";
import Calculadora from "./components/Calculadora/calculadora";
import AuthGuard from "./guard/auth.guard";
import { PrivateRoutes, PublicRouts } from "./rutas/rutas";
import { AdminGuard } from "./guard/admin.guard";
import RoutesWithNotFound from "./utils/RoutesWithNotFound";
import { Suspense, lazy } from "react";

const LandingPage = lazy(() => import("./views/landingPage/landingPage"));
const Login = lazy(() => import("./views/login/Login"));
const Review = lazy(() => import("./components/Review/Review"));
const Home = lazy(() => import("./components/home/home"));
// const Calculator = lazy(() => import("./components/Calculadora/calculadora"));
const FormRegister = lazy(
  () => import("./components/FormRegister/FormRegister")
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
          {/* agregar aqui las rutas privadas para usuarios */}
          <Route element={<AuthGuard />}>
            <Route path={PrivateRoutes.HOME} element={<Home />} />

            <Route path={PrivateRoutes.WALLET} element={<Activos />} />

            <Route path={PrivateRoutes.CRYPTO} element={<DetailsActivs />} />
            <Route path={PrivateRoutes.CALCULATOR} element={<Calculadora />} />

            <Route element={<AdminGuard />}>
              {/* colocar aqui las pestañas para los admins. 
            Agregar las rutas en src/rutas/rutas.ts como lo estan las demas */}
            </Route>
          </Route>

          <Route path="*" element={<h3>404 Page Not Found</h3>} />
        </RoutesWithNotFound>
      </Suspense>
    </div>
  );
}

export default App;
