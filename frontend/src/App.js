import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Account from "./pages/Account";
import Home from "./pages/Home";
import { isAuthenticated } from "./utils/auth.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={<Navigate to={isAuthenticated() ? "/home" : "/"} />}
        />
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/home" /> : <Account />}
        />
        <Route
          path="/home"
          element={isAuthenticated() ? <Home /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
