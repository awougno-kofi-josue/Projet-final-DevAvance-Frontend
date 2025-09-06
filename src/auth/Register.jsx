import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          // Erreur côté backend (ex: email déjà pris)
          throw new Error(data.message || "Erreur lors de l'inscription");
        }
        return data;
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        setRedirect(true); // 
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <h2 className="card-title text-center mb-4">S'inscrire</h2>

        {/*  Message d'erreur */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit} method="post">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nom complet
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Entrez votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirmez votre mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="ms-1 mb-2">
              Rester connecté
            </label>
          </div>

          <button type="submit" className="btn btn-dark w-100">
            S'inscrire
          </button>
        </form>

        <p className="text-center mt-3">
          Avez-vous déjà un compte ?{" "}
          <a href="/login" className="text-decoration-none">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
