import React from 'react';
import { HERO_IMAGE_SRC } from '../data';

function Hero({ heroImageSrc = HERO_IMAGE_SRC }) {
  return (
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
        {heroImageSrc ? (
          <img src={heroImageSrc} alt="Hero" />
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
  );
}

export default Hero;
