import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  // Toggle ouverture/fermeture
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Si on est sur /document ou /ajout-document → cacher Accueil
  const hideAccueil =
    location.pathname.startsWith("/document") ||
    location.pathname.startsWith("/ajout-document");

  return (
    <div className="d-flex">
      {/* Sidebar */}
      {isOpen && (
        <div
          className="d-flex flex-column p-3 bg-light border-end vh-100 shadow-sm"
          style={{ width: "240px" }}
        >
          {/* Logo / Titre */}
          <h5 className="fw-bold mb-4">Documents</h5>

          {/* Navigation */}
          <ul className="nav nav-pills flex-column mb-auto">
            {!hideAccueil && (
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    "nav-link text-dark mb-2 rounded " +
                    (isActive ? "fw-bold bg-dark text-white" : "")
                  }
                >
                  Accueil
                </NavLink>
              </li>
            )}

            <li>
              <NavLink
                to="/document"
                className={({ isActive }) =>
                  "nav-link text-dark mb-2 rounded " +
                  (isActive ? "fw-bold bg-dark text-white" : "")
                }
              >
                Tableau de bord
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/ajout-document"
                className={({ isActive }) =>
                  "nav-link text-dark mb-2 rounded " +
                  (isActive ? "fw-bold bg-dark text-white" : "")
                }
              >
                Ajouter un document
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {/* Bouton toggle (toujours visible) */}
      <button
        onClick={toggleSidebar}
        className="btn btn-dark m-2"
        style={{ height: "40px" }}
      >
        {isOpen ? "⮜" : "☰"}
      </button>
    </div>
  );
};

export default Sidebar;
