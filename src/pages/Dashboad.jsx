import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const [livres, setLivres] = useState([]);
  const [parcoursList, setParcoursList] = useState([]);
  const [parcours, setParcours] = useState("");
  const [niveau, setNiveau] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Niveaux en dur
  const niveauxList = [
    { id: 1, nom: "Licence 1" },
    { id: 2, nom: "Licence 2" },
    { id: 3, nom: "Licence 3" },
    { id: 4, nom: "Master" },
  ];

  useEffect(() => {
    if (!token) return setError("Utilisateur non connecté");

    const headers = { Authorization: `Bearer ${token}` };

    // Récupération des documents
    const fetchDocuments = fetch("http://127.0.0.1:8000/api/documents", { headers })
      .then(res => res.json());

    // Récupération des parcours
    const fetchParcours = fetch("http://127.0.0.1:8000/api/parcours", { headers })
      .then(res => res.json());

    Promise.all([fetchDocuments, fetchParcours])
      .then(([docs, parcoursData]) => {
        setLivres(docs.data || docs);
        setParcoursList(parcoursData);
      })
      .catch(err => {
        console.error(err);
        setError("Erreur lors de la récupération des données");
      })
      .finally(() => setLoading(false));

  }, [token]);

  // Filtrage dynamique
  const livresFiltres = livres.filter(livre =>
    (parcours === "" || livre.parcours_id === parseInt(parcours)) &&
    (niveau === "" || livre.niveau_id === parseInt(niveau)) &&
    (searchTerm === "" || livre.titre.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-danger mt-5">{error}</p>;
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        {/* Barre de recherche + utilisateur */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <input
            type="text"
            placeholder="Rechercher un document"
            className="form-control w-50 shadow-sm mb-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="d-flex align-items-center gap-3 mb-2">
            <NavLink 
            to={"/profile"}
              className="btn btn-outline-success">{user?.name || "Profil"}</NavLink>
          {/* Deconnexion */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            className="btn btn-outline-danger"
          >
            Déconnexion
          </button>
          </div>
          
        </div>


        <h3 className="text-center fw-bold mb-4">Tableau de bord des documents</h3>

        {/* Filtres dynamiques */}
        <div className="d-flex gap-3 mb-4 justify-content-center flex-wrap">
          <select
            className="form-select w-auto shadow-sm"
            value={parcours}
            onChange={(e) => setParcours(e.target.value)}
          >
            <option value="">Tous les parcours</option>
            {parcoursList.map(p => (
              <option key={p.id} value={p.id}>{p.nom}</option>
            ))}
          </select>

          <select
            className="form-select w-auto shadow-sm"
            value={niveau}
            onChange={(e) => setNiveau(e.target.value)}
          >
            <option value="">Tous les niveaux</option>
            {niveauxList.map(n => (
              <option key={n.id} value={n.id}>{n.nom}</option>
            ))}
          </select>
        </div>

        {/* Documents */}
        <div className="row">
          {livresFiltres.length > 0 ? (
            livresFiltres.map(livre => (
              <div key={livre.id} className="col-md-4 mb-4">
                <div className="card border-0 shadow-sm h-100 rounded-3 bg-light">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{livre.titre}</h5>
                    <p className="card-text flex-grow-1">{livre.description || livre.titre}</p>
                    <p className="text-muted mb-1">
                      Parcours: {parcoursList.find(p => p.id === livre.parcours_id)?.nom || 'Inconnu'}
                    </p>
                    <p className="text-muted mb-3">
                      Niveau: {niveauxList.find(n => n.id === livre.niveau_id)?.nom || 'Tous niveaux'}
                    </p>

                    <div className="mt-auto d-flex gap-2">
                      <a
                        href={`http://127.0.0.1:8000/api/documents/${livre.id}/view`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success flex-fill"
                      >
                        Ouvrir
                      </a>
                      <a
                        href={`http://127.0.0.1:8000/api/documents/${livre.id}/download`}
                        className="btn btn-dark flex-fill"
                      >
                        Télécharger
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">Aucun document trouvé</p>
          )}
        </div>
        <div className="mt-6">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
