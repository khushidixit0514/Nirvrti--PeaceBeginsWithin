import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../pages/style.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (header) {
        header.classList.toggle("scrolled", window.scrollY > 50);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close tools dropdown if mobile menu toggled
  const toggleMenu = () => {
    setMenuOpen((prev) => {
      if (prev) setToolsOpen(false);
      return !prev;
    });
  };

  return (
    <header>
      <div className="header-container">
        <Link to="/" className="logo-container">
          <img src="/logo.webp" alt="Nirvrti logo" className="logo-image" />
          <span className="logo-text">Nirvrti – Peace Begins Within!</span>
        </Link>

        <nav className={menuOpen ? "open" : ""}>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>

            <li className={`dropdown ${toolsOpen ? "open" : ""}`} ref={toolsRef}>
              <span
                className="dropdown-link"
                onClick={() => setToolsOpen((prev) => !prev)}
                tabIndex={0} // make it keyboard accessible
                onKeyDown={(e) => { if(e.key === 'Enter') setToolsOpen((prev) => !prev)}}
              >
                Tools ▾
              </span>
              {toolsOpen && (
                <ul className="dropdown-menu">
                  <li><Link to="/write" onClick={() => setToolsOpen(false)}>Writing Space</Link></li>
                  <li><Link to="/detox" onClick={() => setToolsOpen(false)}>Mental Detox</Link></li>
                  <li><Link to="/reset" onClick={() => setToolsOpen(false)}>1-Minute Reset</Link></li>
                  <li><Link to="/capsule" onClick={() => setToolsOpen(false)}>Time Capsule</Link></li>
                  <li><Link to="/issues" onClick={() => setToolsOpen(false)}>Issues</Link></li>
                  <li><Link to="/stories" onClick={() => setToolsOpen(false)}>Stories</Link></li>
                </ul>
              )}
            </li>

            <li><Link to="/support">Get Support</Link></li>
            <li><Link to="/connect">Connect With Us</Link></li>
          </ul>
        </nav>

        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if(e.key === 'Enter') toggleMenu() }}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
