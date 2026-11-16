import React, { useState, useEffect } from 'react';

function BackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      id="btt"
      className={showBackToTop ? 'show' : ''}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      ↑ Top
    </button>
  );
}

export default BackToTop;
