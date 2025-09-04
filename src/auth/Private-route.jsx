import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // null = vérification en cours

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuth(true);  // token trouvé → utilisateur considéré comme authentifié
    } else {
      setIsAuth(false); // pas de token → non authentifié
    }
  }, []);

  if (isAuth === null) {
    // ⚡ Affichage pendant la vérification (ou animation)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  // Redirection si non authentifié, sinon rend l’enfant
  return isAuth ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
