import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../components/Layout.jsx";
import { Settings1 } from "../pages/Settings1.jsx";
import { Settings2 } from "../pages/Settings2.jsx";
import { Weeks } from "../pages/dashboard/Weeks.jsx";
import { Consumes } from "../pages/dashboard/Consumes.jsx";
import { AvgAge } from "../pages/dashboard/AvgAge.jsx";
import { DashboardMap } from "../pages/dashboard/DashboardMap.jsx";
import { Seasons } from "../pages/dashboard/Seasons.jsx";
import { Reports } from "../pages/dashboard/Reports.jsx";
import { StreetLamps } from "../pages/dashboard/SteetLamps.jsx";
import { DashboardLayout } from "../pages/dashboard/DashboardLayout.jsx";
import { Contacts } from "../pages/Contacts.jsx";
import { MapPage } from "../pages/base_map/base_map.jsx";
import { CitizenHome } from "../pages/citizen/CitizenHome.jsx";
import { CitizenReport } from "../pages/citizen/CitizenReport.jsx";
import Login from "../pages/auth/Login.jsx";
import SignUp from "../pages/auth/SignUp.jsx";
import { ReportContext } from "../pages/citizen/reportContext.jsx";
import { useState } from "react";
import { CitizenSettings } from "../pages/citizen/CitizenSettings.jsx";

function AppRouter() {
  const [reportLamp, setReportLamp] = useState(null);
  console.log(reportLamp);

  return (
    <ReportContext value={{reportLamp, setReportLamp}}>
      
    <BrowserRouter>
      <Routes>

        <Route path='/settings' element={<Layout />}>
          <Route index element={<Navigate to="settings1" replace/>} />
          <Route path='settings1' element={<Settings1 />}></Route>
          <Route path='settings2' element={<Settings2 />}></Route>
        </Route>

        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<Navigate to="streetLamps" replace/>} />
          <Route path='weeks' element={<Weeks />}></Route>
          <Route path='seasons' element={<Seasons />}></Route>
          <Route path='streetLamps' element={<StreetLamps />}></Route>
          <Route path='avg-age' element={<AvgAge />}></Route>
          <Route path='consumes' element={<Consumes />}></Route>
          <Route path='dashboardMap' element={<DashboardMap />}></Route>
          <Route path='reports' element={<Reports />}></Route>
        </Route>

        <Route path='/contacts' element={<Contacts />}></Route>
        <Route path='/map' element={<MapPage />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/Login" element={<Navigate to="/login" replace />}></Route>
        <Route path="/SignUp" element={<Navigate to="/signup" replace />}></Route>

        <Route path="/citizen" element={<CitizenHome />}></Route>
        <Route path="/citizen/report" element={<CitizenReport></CitizenReport>}></Route>
        <Route path="/citizen/settings" element={<CitizenSettings></CitizenSettings>}></Route>
      </Routes>
    </BrowserRouter>
    </ReportContext>
  );
}

export default AppRouter;