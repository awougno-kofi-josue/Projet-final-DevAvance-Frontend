import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const AjoutDocument = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [parcours, setParcours] = useState("");
  const [niveau, setNiveau] = useState("");
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Format de fichier non supporté (pdf ou docx seulement).");
      return;
    }

    if (selectedFile.size > 2 * 1024 * 1024) {
      setError("Le fichier dépasse 2 Mo.");
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Veuillez sélectionner un fichier valide.");
      return;
    }

    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("description", description);
    formData.append("parcours_id", parcours);
    formData.append("niveau_id", niveau);
    formData.append("fichier", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/documents", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
  const errorText = await response.text();
  console.error("Erreur API:", response.status, errorText);
  setError(`Erreur API ${response.status}: ${errorText}`);
  return;
}

      setRedirect(true);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  if (redirect) return <Navigate to="/document" />;

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <form
            className="p-4 border rounded shadow-sm bg-white"
            style={{ maxWidth: "800px", margin: "auto" }}
            onSubmit={handleSubmit}
            method="post"
          >
            <h1>Ajouter un document</h1>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label htmlFor="titre" className="form-label">Titre</label>
              <input
                type="text"
                id="titre"
                className="form-control"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                required
                placeholder="Saisir le titre du document"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                maxLength={500}
                placeholder="Ajouter une courte description"
                required
              ></textarea>
              <p className="text-muted">Max 500 caractères</p>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="parcours" className="form-label">Parcours</label>
                <select
                  id="parcours"
                  className="form-select"
                  value={parcours}
                  onChange={(e) => setParcours(e.target.value)}
                  required
                >
                  <option value="">Sélectionner un parcours</option>
                  <option value="3">Mathématiques</option>
                  <option value="2">Physique</option>
                  <option value="1">Chimie</option>
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="niveau" className="form-label">Année</label>
                <select
                  id="niveau"
                  className="form-select"
                  value={niveau}
                  onChange={(e) => setNiveau(e.target.value)}
                  required
                >
                  <option value="">Sélectionner une année</option>
                  <option value="1">Licence 1</option>
                  <option value="2">Licence 2</option>
                  <option value="3">Licence 3</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="file" className="form-label">Fichier</label>
              <input
                type="file"
                id="file"
                className="form-control"
                onChange={handleFileChange}
                required
              />
              <p className="text-muted">Formats acceptés : pdf, docx. Taille max 2 Mo</p>
            </div>

            <div className="d-flex gap-3">
              <a href="/document" className="btn btn-secondary btn-lg">Annuler</a>
              <button type="submit" className="btn btn-primary btn-lg">Ajouter</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AjoutDocument;
