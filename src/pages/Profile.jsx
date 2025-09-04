// Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
        navigate("/login"); // si pas connecté → redirection
        return;
        }

        fetch("http://127.0.0.1:8000/api/user", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
        })
        .then(async (res) => {
            if (!res.ok) {
            throw new Error("Erreur lors de la récupération des données utilisateur");
            }
            return res.json();
        })
        .then((data) => {
            setUser(data);
        })
        .catch((err) => {
            console.error(err);
            setError(err.message);
        })
        .finally(() => setLoading(false));
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (loading) {
        return (
        <div className="text-center mt-5">
            <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Chargement...</span>
            </div>
        </div>
        );
    }

    if (error) {
        return <p className="text-center text-danger">{error}</p>;
    }

    return (
        <div className="container mt-5">
        <div className="card shadow-sm p-4">
            <h3 className="mb-3">👤 Profil utilisateur</h3>
            {user ? (
            <>
                <p><strong>Nom :</strong> {user.name}</p>
                <p><strong>Email :</strong> {user.email}</p>
                <p><strong>Créé le :</strong> {new Date(user.created_at).toLocaleDateString()}</p>

                <button className="btn btn-dark mt-3" onClick={handleLogout}>
                Se déconnecter
                </button>
            </>
            ) : (
            <p>Aucune donnée utilisateur.</p>
            )}
        </div>
        </div>
    );
};

export default Profile;
