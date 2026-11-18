import React from 'react';

function About() {
  return (
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
  );
}

export default About;
