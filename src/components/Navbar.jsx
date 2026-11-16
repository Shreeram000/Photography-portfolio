import React, { useState, useEffect } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle nav menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close nav menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!isMenuOpen) return;
      const navbar = document.querySelector('nav');
      const drawer = document.getElementById('nav-drawer');
      if (
        navbar && !navbar.contains(e.target) &&
        drawer && !drawer.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isMenuOpen]);

  return (
    <>
      {/* ─── NAV ─── */}
      <nav>
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          SHREERAM.PHOTO
        </div>
        <ul className="nav-links">
          <li><a href="#events">Events</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-status">
          <span className="dot"></span>Available for bookings
        </div>
        <button
          className={`nav-burger ${isMenuOpen ? 'open' : ''}`}
          id="burger"
          aria-label="Menu"
          onClick={toggleMenu}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <nav className={`nav-drawer ${isMenuOpen ? 'open' : ''}`} id="nav-drawer">
        <a href="#events" onClick={() => setIsMenuOpen(false)}>Events <span>↗</span></a>
        <a href="#about" onClick={() => setIsMenuOpen(false)}>About <span>↗</span></a>
        <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact <span>↗</span></a>
        <a href="mailto:your@email.com" onClick={() => setIsMenuOpen(false)}>Book a Shoot <span>→</span></a>
      </nav>
    </>
  );
}

export default Navbar;
