import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* qui aggiungerai altre pagine più avanti */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
