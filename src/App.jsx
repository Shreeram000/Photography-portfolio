import React, { useState, useEffect, useRef } from 'react';
import { EVENTS, HERO_IMAGE_SRC } from './data';

const getPhotoSrc = (p) => (p && typeof p === 'object' ? p.src : p);
const getPhotoCaption = (p) => (p && typeof p === 'object' ? p.caption : '');

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lightboxState, setLightboxState] = useState(null); // { eventIndex: number, photoIndex: number }
  const [showBackToTop, setShowBackToTop] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

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

  // Back to Top button scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lightbox navigation step
  const lbStep = (dir) => {
    setLightboxState((prev) => {
      if (!prev) return null;
      const activeEvent = EVENTS[prev.eventIndex];
      const nextIdx = prev.photoIndex + dir;
      if (nextIdx < 0 || nextIdx >= activeEvent.photos.length) return prev;
      return { ...prev, photoIndex: nextIdx };
    });
  };

  // Lightbox jump directly to slide
  const jumpLB = (i) => {
    setLightboxState((prev) => {
      if (!prev) return null;
      return { ...prev, photoIndex: i };
    });
  };

  // Lightbox body scroll lock
  useEffect(() => {
    if (lightboxState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxState]);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (!lightboxState) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxState(null);
      if (e.key === 'ArrowRight') lbStep(1);
      if (e.key === 'ArrowLeft') lbStep(-1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxState]);

  // Lightbox thumbnail strip center active item
  useEffect(() => {
    if (lightboxState) {
      const activeThumb = document.querySelector('.strip-thumb.active');
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [lightboxState]);

  // Touch Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
    touchStartY.current = e.changedTouches[0].screenY;
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX.current;
    const dy = e.changedTouches[0].screenY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      lbStep(dx < 0 ? 1 : -1);
    }
  };

  // Open Lightbox
  const openLB = (eventIndex) => {
    setLightboxState({ eventIndex, photoIndex: 0 });
  };

  // Setup active data details for JSX
  const activeEvent = lightboxState !== null ? EVENTS[lightboxState.eventIndex] : null;
  const activePhoto = activeEvent ? activeEvent.photos[lightboxState.photoIndex] : null;
  const totalPhotos = activeEvent ? activeEvent.photos.length : 0;
  const currentPhotoNum = lightboxState !== null ? lightboxState.photoIndex + 1 : 0;

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

      {/* ─── HERO ─── */}
      <header>
        <div className="hero-left">
          <div>
            <p className="hero-eyebrow">// Cinematographer &amp; Event Photographer</p>
            <h1 style={{ marginTop: '28px' }}>
              Moments<br />in<br /><em>Frame</em>
            </h1>
          </div>
          <p className="hero-desc">
            Events captured with a cinematic eye. Corporate, cultural, live performance — every frame treated as a still from a film that hasn't been made yet.
          </p>
          <div className="hero-counter">Chennai, Tamil Nadu — EST. 2019</div>
        </div>
        <div className="hero-right">
          {HERO_IMAGE_SRC ? (
            <img src={HERO_IMAGE_SRC} alt="Hero" />
          ) : (
            <div className="ph-cross"><span className="ph-text">Hero Image</span></div>
          )}
          <div className="hero-tag">HERO / 01</div>
        </div>
        <div className="hero-bottom">
          <div className="stat-item"><div className="stat-num">20+</div><div className="stat-label">Events Shot</div></div>
          <div className="stat-item"><div className="stat-num">2+</div><div className="stat-label">Years Active</div></div>
          <div className="stat-item"><div className="stat-num">5K+</div><div className="stat-label">Frames Delivered</div></div>
          <div className="stat-item"><div className="stat-num">20+</div><div className="stat-label">Clients</div></div>
        </div>
      </header>

      {/* ─── EVENTS ─── */}
      <section id="events">
        <div className="section-header">
          <span className="section-num">01 /</span>
          <span className="section-title">Events</span>
          <span className="section-rule"></span>
          <span className="section-count">{EVENTS.length} EVENTS</span>
        </div>
        <div className="events-grid" id="events-grid">
          {EVENTS.map((ev, ei) => (
            <div key={ei} className="event-card" onClick={() => openLB(ei)}>
              <div className="card-cover">
                {getPhotoSrc(ev.photos[0]) ? (
                  <img src={getPhotoSrc(ev.photos[0])} alt={ev.name} loading="lazy" />
                ) : (
                  <div className="ph-cross" style={{ minHeight: 'unset', height: '100%' }}>
                    <span className="ph-text">Cover Photo</span>
                  </div>
                )}
                <div className="card-cover-overlay"><span>↗</span></div>
                <div className="card-photo-count">
                  {ev.photos.length} photo{ev.photos.length !== 1 ? 's' : ''}
                </div>
              </div>
              <div className="card-info">
                <div>
                  <div className="card-name">{ev.name}</div>
                  <div className="card-meta">{ev.year} · {ev.loc}</div>
                </div>
                <div className="card-arrow">↗</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about">
        <div className="section-header">
          <span className="section-num">02 /</span>
          <span className="section-title">About</span>
          <span className="section-rule"></span>
        </div>
        <div className="about-wrap">
          <div className="about-left">
            <div className="about-big">The<br />eye<br />behind<br />the<br />lens.</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#999' }}>
              Chennai, Tamil Nadu
            </div>
          </div>
          <div className="about-right">
            <p className="about-body">
              I'm <strong>Shreeram</strong> — a cinematographer and event photographer based in Chennai. My work lives at the intersection of documentation and cinema: I'm not just recording what happened, I'm building the visual record of how it <em>felt</em>.
              <br /><br />
              From college fests and cultural nights to corporate conferences and live performances, I bring a <strong>filmmaker's approach</strong> to still photography — deliberate framing, available light used intentionally, and a respect for the decisive moment.
              <br /><br />
              Beyond photography, I work in video editing, motion graphics, and VFX — which means every image I take is also thinking about sequence, rhythm, and the story it belongs to.
            </p>
            <div className="tags">
              <span className="tag active">Event Photography</span>
              <span className="tag">Cinematography</span>
              <span className="tag active">Corporate Events</span>
              <span className="tag">Cultural Fests</span>
              <span className="tag">VFX</span>
              <span className="tag active">Motion Graphics</span>
              <span className="tag">Video Editing</span>
              <span className="tag">Concert Photography</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact">
        <div className="section-header">
          <span className="section-num">03 /</span>
          <span className="section-title">Contact</span>
          <span className="section-rule"></span>
        </div>
        <div className="contact-wrap">
          <div className="contact-left">
            <div className="contact-big">Let's<br />shoot<br /><em>something.</em></div>
            <a className="cta-btn" href="mailto:your@email.com">→ Send Enquiry</a>
          </div>
          <div className="contact-right">
            <div className="contact-row"><span className="contact-row-label">Email</span><span className="contact-row-val">your@email.com</span></div>
            <div className="contact-row"><span className="contact-row-label">Phone</span><span className="contact-row-val">+91 XXXXX XXXXX</span></div>
            <div className="contact-row"><span className="contact-row-label">Instagram</span><span className="contact-row-val">@your_handle</span></div>
            <div className="contact-row"><span className="contact-row-label">Behance</span><span className="contact-row-val">behance.net/your_profile</span></div>
            <div className="contact-row" style={{ borderBottom: 'none', paddingBottom: 0 }}>
              <span className="contact-row-label">Based in</span>
              <span className="contact-row-val">Chennai, TN — available to travel</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer>
        <div className="footer-cell"><div className="footer-label">Photographer</div><div className="footer-val">Shreeram</div></div>
        <div className="footer-cell"><div className="footer-label">Location</div><div className="footer-val">Chennai, Tamil Nadu, IN</div></div>
        <div className="footer-cell"><div className="footer-label">Copyright</div><div className="footer-val">© 2025 · All images reserved</div></div>
      </footer>

      {/* ─── BACK TO TOP ─── */}
      <button
        id="btt"
        className={showBackToTop ? 'show' : ''}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑ Top
      </button>

      {/* ─── LIGHTBOX ─── */}
      <div className={`lb ${lightboxState !== null ? 'open' : ''}`} id="lb">
        {lightboxState !== null && activeEvent && (
          <>
            <div className="lb-topbar">
              <div style={{ minWidth: 0, flex: 1 }}>
                <div className="lb-event-name">{activeEvent.name}</div>
              </div>
              <div className="lb-event-meta">{activeEvent.year} · {activeEvent.loc}</div>
              <div className="lb-counter-top">{currentPhotoNum} / {totalPhotos}</div>
              <button className="lb-close-btn" onClick={() => setLightboxState(null)}>[ESC] ✕</button>
            </div>
            <div
              className="lb-stage"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <button
                className="lb-arrow lb-arrow-prev"
                onClick={() => lbStep(-1)}
                disabled={lightboxState.photoIndex === 0}
              >
                ←
              </button>
              <div className="lb-img-wrap">
                {getPhotoSrc(activePhoto) ? (
                  <img src={getPhotoSrc(activePhoto)} alt={getPhotoCaption(activePhoto) || activeEvent.name} />
                ) : (
                  <div className="lb-ph">
                    <span className="lb-ph-txt">
                      IMG {String(currentPhotoNum).padStart(2, '0')} — Add your photo
                    </span>
                  </div>
                )}
              </div>
              <button
                className="lb-arrow lb-arrow-next"
                onClick={() => lbStep(1)}
                disabled={lightboxState.photoIndex === totalPhotos - 1}
              >
                →
              </button>
            </div>
            {/* Mobile caption */}
            <div className="lb-caption-bar">
              {getPhotoCaption(activePhoto) || `${activeEvent.year} · ${activeEvent.loc}`}
            </div>
            {/* Mobile dots */}
            <div className="lb-dots">
              {activeEvent.photos.map((_, i) => (
                <button
                  key={i}
                  className={`lb-dot ${i === lightboxState.photoIndex ? 'active' : ''}`}
                  onClick={() => jumpLB(i)}
                  aria-label={`Photo ${i + 1}`}
                ></button>
              ))}
            </div>
            {/* Desktop filmstrip */}
            <div className="lb-strip">
              {activeEvent.photos.map((p, i) => (
                <div
                  key={i}
                  className={`strip-thumb ${i === lightboxState.photoIndex ? 'active' : ''}`}
                  onClick={() => jumpLB(i)}
                >
                  {getPhotoSrc(p) ? (
                    <img src={getPhotoSrc(p)} alt={getPhotoCaption(p) || ''} />
                  ) : (
                    <span className="strip-ph">
                      IMG<br />{String(i + 1).padStart(2, '0')}
                    </span>
                  )}
                  <span className="strip-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
