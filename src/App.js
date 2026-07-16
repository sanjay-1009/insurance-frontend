import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Policy from "./pages/Policy";
import Claim from "./pages/Claim";
import Approval from "./pages/Approval";
import Reports from "./pages/Reports";
import Policies from "./pages/Policies";
import MyClaims from "./pages/MyClaims";
import Home from "./pages/Home";
import Register from "./pages/Register";
import BuyPolicy from "./pages/BuyPolicy";



function AppContent() {

  const location = useLocation();

  const loggedIn =
    localStorage.getItem("loggedIn") === "true";

  return (
    <>
      

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/policy"
          element={<Policy />}
        />

        <Route
          path="/claim"
          element={<Claim />}
        />

        <Route
          path="/approval"
          element={<Approval />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/policies"
          element={<Policies />}
        />

        <Route
          path="/myclaims"
          element={<MyClaims />}
        />
        <Route
    path="/buy-policy"
    element={<BuyPolicy />}
/>

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;