import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import AjoutDocument from "./pages/Ajout-document";
import Dashboard from "./pages/Dashboad";
import Login from "./auth/Login";
import Register from "./auth/Register";
import PrivateRoute from "./auth/Private-route";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Pages publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Accueil />} />

        {/* Pages protégées */}
        <Route
          path="/document"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/ajout-document"
          element={
            <PrivateRoute>
              <AjoutDocument />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
