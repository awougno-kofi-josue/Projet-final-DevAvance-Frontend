import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); //  état pour gérer les erreurs
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // reset erreur avant chaque tentative

    fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          // si erreur (401, 422, etc.)
          throw new Error(data.message || "Email ou mot de passe incorrect");
        }
        return data;
      })
      .then((data) => {
        localStorage.setItem("token", data.token); //  stocke le token
        navigate("/document"); //  redirection
      })
      .catch((error) => {
        setError(error.message); // afficher l'erreur
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h2 className="card-title text-center mb-4">Se connecter</h2>

        {/*  Message d’erreur */}
        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

        <form onSubmit={handleSubmit} method="POST">
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

          <div className="d-flex justify-content-between mb-3">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="ms-1">
                Se souvenir de moi
              </label>
            </div>
            <a href="/forgot-password" className="text-decoration-none">
              Mot de passe oublié ?
            </a>
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Se connecter
          </button>
        </form>

        <p className="text-center mt-3">
          N'avez-vous pas encore de compte ?{" "}
          <a href="/register" className="text-decoration-none">
            S'inscrire
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
