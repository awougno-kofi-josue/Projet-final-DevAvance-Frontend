// Navbar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    // Appel API pour récupérer l'utilisateur connecté
    fetch("http://127.0.0.1:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Non autorisé");
        return res.json();
      })
      .then((data) => {
        setUser(data); // Stocke les infos utilisateur
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo / Titre */}
        <span className="navbar-brand fw-bold">Plateforme d'archives</span>

        {/* Boutons à droite */}
        <div className="d-flex gap-2">
          {loading ? (
            <span className="text-muted small">Chargement...</span>
          ) : !user ? (
            <>
              <NavLink to="/login" className="btn btn-dark btn-sm fw-semibold">
                Se connecter
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn-outline-dark btn-sm fw-semibold"
              >
                Créer un compte
              </NavLink>
            </>
          ) : (
            <>
              <span className="fw-semibold">👋 {user.name}</span>
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm fw-semibold"
              >
                Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
