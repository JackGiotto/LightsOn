import React from 'react';
import './App.css';
import { Layout } from './Components/Layout.jsx';
import { BrowserRouter, Route, Routes } from "react-router";
import { Imp1 } from './pages/Imp1.jsx';
import { Imp2 } from './pages/Imp2.jsx';
import { Imp3 } from './pages/Imp3.jsx';

import { Settimane } from './pages/dashboard/Settimane.jsx';
import { Consumi } from './pages/dashboard/Consumi.jsx';
import { EtaMedia } from './pages/dashboard/EtaMedia.jsx';
import { Mappa } from './pages/dashboard/Mappa.jsx';
import { Stagioni } from './pages/dashboard/Stagioni.jsx';
import { Segnalazioni } from './pages/dashboard/Segnalazioni.jsx';
import { Lampioni } from './pages/dashboard/Lampioni.jsx';
import { DashboardLayout } from './pages/dashboard/DashboardLayout.jsx';
import { Contatti } from './pages/Contatti.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/settings' element={<Layout />}>
          <Route path='settings1' element={<Imp1 />}></Route>
          <Route path='settings2' element={<Imp2 />}></Route>
          <Route path='settings3' element={<Imp3 />}></Route>
        </Route>

        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route path='settimane' element={<Settimane />}></Route>
          <Route path='stagioni' element={<Stagioni />}></Route>
          <Route path='lampioni' element={<Lampioni />}></Route>
          <Route path='eta-media' element={<EtaMedia />}></Route>
          <Route path='consumi' element={<Consumi />}></Route>
          <Route path='mappa' element={<Mappa />}></Route>
          <Route path='segnalazioni' element={<Segnalazioni />}></Route>

        </Route>

        <Route path='/contatti' element={<Contatti />}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
