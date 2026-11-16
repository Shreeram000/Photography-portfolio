import React, { useState } from 'react';
import { EVENTS } from './data';
import {
  Navbar,
  Hero,
  Events,
  About,
  Contact,
  Footer,
  BackToTop,
  Lightbox,
} from './components';

function App() {
  const [lightboxState, setLightboxState] = useState(null); // { eventIndex: number, photoIndex: number }

  const openLightbox = (eventIndex) => {
    setLightboxState({ eventIndex, photoIndex: 0 });
  };

  const closeLightbox = () => {
    setLightboxState(null);
  };

  const stepLightbox = (dir) => {
    setLightboxState((prev) => {
      if (!prev) return null;
      const activeEvent = EVENTS[prev.eventIndex];
      const nextIdx = prev.photoIndex + dir;
      if (nextIdx < 0 || nextIdx >= activeEvent.photos.length) return prev;
      return { ...prev, photoIndex: nextIdx };
    });
  };

  const jumpLightbox = (i) => {
    setLightboxState((prev) => {
      if (!prev) return null;
      return { ...prev, photoIndex: i };
    });
  };

  const activeEvent = lightboxState !== null ? EVENTS[lightboxState.eventIndex] : null;

  return (
    <>
      <Navbar />
      <Hero />
      <Events events={EVENTS} onSelectEvent={openLightbox} />
      <About />
      <Contact />
      <Footer />
      <BackToTop />
      <Lightbox
        isOpen={lightboxState !== null}
        event={activeEvent}
        photoIndex={lightboxState ? lightboxState.photoIndex : 0}
        onClose={closeLightbox}
        onStep={stepLightbox}
        onJump={jumpLightbox}
      />
    </>
  );
}

export default App;
