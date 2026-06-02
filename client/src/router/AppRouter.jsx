import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { MapPage } from "../pages/map/map.jsx";
import { HomeCitizen } from "../pages/cittadino/HomeCitizen.jsx";
import { Report } from "../pages/cittadino/Report.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/settings' element={<Layout />}>
          <Route index element={<Navigate to="settings1" replace/>} />
          <Route path='settings1' element={<Imp1 />}></Route>
          <Route path='settings2' element={<Imp2 />}></Route>
        </Route>

        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<Navigate to="lampioni" replace/>} />
          <Route path='settimane' element={<Settimane />}></Route>
          <Route path='stagioni' element={<Stagioni />}></Route>
          <Route path='lampioni' element={<Lampioni />}></Route>
          <Route path='eta-media' element={<EtaMedia />}></Route>
          <Route path='consumi' element={<Consumi />}></Route>
          <Route path='mappa' element={<Mappa />}></Route>
          <Route path='segnalazioni' element={<Segnalazioni />}></Route>
        </Route>

        <Route path='/contatti' element={<Contatti />}></Route>
        <Route path='/map' element={<MapPage />}></Route>

        <Route path="/cittadino" element={<HomeCitizen />}></Route>
        <Route path="/cittadino/segnala" element={<Report></Report>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;