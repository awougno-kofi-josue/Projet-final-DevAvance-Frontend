
import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const Accueil = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <Navbar />

      {/* Layout principal */}
      <div className="d-flex flex-grow-1" style={{ marginTop: "auto" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Contenu principal */}
        <main className="flex-grow-1 p-4 bg-white">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark">Bienvenue sur les archives de documents</h2>
            <p className="text-muted">
              Consultez, téléchargez et partagez des documents académiques et publics. 
              Les étudiants doivent se connecter pour ajouter ou gérer des documents.
            </p>

            {/* Boutons */}
            <div className="d-flex justify-content-center gap-2 mb-3">
              <a className="btn btn-dark fw-semibold" href="/login">
                → Se connecter pour continuer
              </a>
              <a className="btn btn-outline-dark fw-semibold" href="/document">
                Parcourir les archives
              </a>
            </div>

            {/* Note orange */}
            <div className="alert alert-warning fw-semibold py-2">
              Note : vous devez être connecté en tant qu’étudiant pour ajouter un document ou accéder aux fonctionnalités réservées.
            </div>
          </div>

          {/* Accès rapide */}
          <div className="mb-5">
            <h5 className="fw-bold mb-3">Accès rapide</h5>
            <div className="row g-3">
              <div className="col-md-3 col-6">
                <div className="card shadow-sm border-0 h-100 text-center">
                  <div className="card-body">
                    <span className="fw-semibold">📚 Parcours</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card shadow-sm border-0 h-100 text-center">
                  <div className="card-body">
                    <span className="fw-semibold">📅 Années</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card shadow-sm border-0 h-100 text-center">
                  <div className="card-body">
                    <span className="fw-semibold">📄 Derniers documents</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card shadow-sm border-0 h-100 text-center">
                  <div className="card-body">
                    <span className="fw-semibold">⭐ Populaires</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comment ça marche */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold">Comment ça marche</h6>
              <p className="text-muted mb-0">
                1) Parcourez les archives publiques. <br />
                2) Connectez-vous pour ajouter vos documents. <br />
                3) Enregistrez et téléchargez en toute simplicité.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Accueil;
