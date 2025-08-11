import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pages/style.css";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div className="footer-container">
        {showTopBtn && (
          <button
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            ↑ Back to Top
          </button>
        )}

        <Link to="/" className="footer-logo-link">
          <img
            src="/logo.webp"
            alt="Nirvrti Logo"
            className="footer-logo-img"
          />
        </Link>

        <div className="made-with-love">
          Made with <span role="img" aria-label="love">❤️</span> by Khushi Dixit
        </div>
      </div>

      <div className="footer-bottom-text">
        © {new Date().getFullYear()} Nirvrti. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
