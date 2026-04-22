import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import MapPage from "../pages/map/map";
import { Layout } from "../Components/Layout.jsx";
import { Imp1 } from "../pages/Imp1.jsx";
import { Imp2 } from "../pages/Imp2.jsx";
import { Settimane } from "../pages/dashboard/Settimane.jsx";
import { Consumi } from "../pages/dashboard/Consumi.jsx";
import { EtaMedia } from "../pages/dashboard/EtaMedia.jsx";
import { Mappa } from "../pages/dashboard/Mappa.jsx";
import { Stagioni } from "../pages/dashboard/Stagioni.jsx";
import { Segnalazioni } from "../pages/dashboard/Segnalazioni.jsx";
import { Lampioni } from "../pages/dashboard/Lampioni.jsx";
import { DashboardLayout } from "../pages/dashboard/DashboardLayout.jsx";
import { Contatti } from "../pages/Contatti.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/map" element={<MapPage />} />

        <Route path="/settings" element={<Layout />}>
          <Route path="settings1" element={<Imp1 />} />
          <Route path="settings2" element={<Imp2 />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="settimane" element={<Settimane />} />
          <Route path="stagioni" element={<Stagioni />} />
          <Route path="lampioni" element={<Lampioni />} />
          <Route path="eta-media" element={<EtaMedia />} />
          <Route path="consumi" element={<Consumi />} />
          <Route path="mappa" element={<Mappa />} />
          <Route path="segnalazioni" element={<Segnalazioni />} />
        </Route>

        <Route path="/contatti" element={<Contatti />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
