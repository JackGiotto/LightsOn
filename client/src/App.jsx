import React from 'react';
import './App.css';
import { Layout } from './Components/Layout.jsx';
import { BrowserRouter, Route, Routes } from "react-router";
import { Imp1 } from './pages/Imp1.jsx';
import { Imp2 } from './pages/Imp2.jsx';

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
    <svg width={332} height={455} fill="none" className="back1">
      <path
        d="M129.079 210.5C120.239 62.1 39.343 8.333 0 0h331.487v455s-191.359-59-202.408-244.5z"
        fill="#F4C50B"
      />
    </svg>

    <svg width="925" height="285" viewBox="0 0 925 285" fill="none" xmlns="http://www.w3.org/2000/svg" className='back2'>
      <path d="M385 24.3281C697.976 114.212 733.5 231.5 925 289.328L71.9996 289.328C-266 289.328 -266 56.3281 -266 56.3281C-266 56.3281 143 -45.172 385 24.3281Z" fill="#F4C50B"/>
    </svg>

      <Routes>
        <Route path='/settings' element={<Layout />}>
          <Route path='settings1' element={<Imp1 />}></Route>
          <Route path='settings2' element={<Imp2 />}></Route>
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
