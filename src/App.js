import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Dashboar from "./components/Dashboard";
// import Login from "./components/Login";
import Login from "./components/Login.js";
import Register from "./components/Register";
import PrivateRoutes from "./layouts/PrivateRoutes";
import PublicRoutes from "./components/PublicRoutes";
import Layout from "./layouts/Layout";
import { toast } from "react-toastify";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Main />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Dashboar />} />
          </Route>
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
