// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-top text-muted py-3 mt-auto ">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="text-center mb-2 mb-md-0">
          © 2025 Université — Archives des documents
        </div>
        <div className="d-flex gap-3">
          <a className="text-muted text-decoration-none" href="#">Aide</a>
          <a className="text-muted text-decoration-none" href="#">Confidentialité</a>
          <a className="text-muted text-decoration-none" href="#">Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
