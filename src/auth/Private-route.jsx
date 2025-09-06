import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuth(true); 
    } else {
      setIsAuth(false); 
    }
  }, []);

  if (isAuth === null) {
    
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
