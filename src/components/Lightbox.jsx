import React, { useEffect, useRef } from 'react';
import { getPhotoSrc, getPhotoCaption } from '../utils/photoUtils';

function Lightbox({
  isOpen,
  event,
  photoIndex = 0,
  onClose,
  onStep,
  onJump,
}) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'ArrowRight') onStep?.(1);
      if (e.key === 'ArrowLeft') onStep?.(-1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onStep]);

  // Thumbnail strip center active item
  useEffect(() => {
    if (isOpen) {
      const activeThumb = document.querySelector('.strip-thumb.active');
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [isOpen, photoIndex]);

  // Touch Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
    touchStartY.current = e.changedTouches[0].screenY;
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX.current;
    const dy = e.changedTouches[0].screenY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      onStep?.(dx < 0 ? 1 : -1);
    }
  };

  const activePhoto = event ? event.photos[photoIndex] : null;
  const totalPhotos = event ? event.photos.length : 0;
  const currentPhotoNum = photoIndex + 1;

  return (
    <div className={`lb ${isOpen ? 'open' : ''}`} id="lb">
      {isOpen && event && (
        <>
          <div className="lb-topbar">
            <div style={{ minWidth: 0, flex: 1 }}>
              <div className="lb-event-name">{event.name}</div>
            </div>
            <div className="lb-event-meta">{event.year} · {event.loc}</div>
            <div className="lb-counter-top">{currentPhotoNum} / {totalPhotos}</div>
            <button className="lb-close-btn" onClick={onClose}>[ESC] ✕</button>
          </div>
          <div
            className="lb-stage"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              className="lb-arrow lb-arrow-prev"
              onClick={() => onStep?.(-1)}
              disabled={photoIndex === 0}
            >
              ←
            </button>
            <div className="lb-img-wrap">
              {getPhotoSrc(activePhoto) ? (
                <img
                  src={getPhotoSrc(activePhoto)}
                  alt={getPhotoCaption(activePhoto) || event.name}
                />
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
              onClick={() => onStep?.(1)}
              disabled={photoIndex === totalPhotos - 1}
            >
              →
            </button>
          </div>

          {/* Mobile caption */}
          <div className="lb-caption-bar">
            {getPhotoCaption(activePhoto) || `${event.year} · ${event.loc}`}
          </div>

          {/* Mobile dots */}
          <div className="lb-dots">
            {event.photos.map((_, i) => (
              <button
                key={i}
                className={`lb-dot ${i === photoIndex ? 'active' : ''}`}
                onClick={() => onJump?.(i)}
                aria-label={`Photo ${i + 1}`}
              ></button>
            ))}
          </div>

          {/* Desktop filmstrip */}
          <div className="lb-strip">
            {event.photos.map((p, i) => (
              <div
                key={i}
                className={`strip-thumb ${i === photoIndex ? 'active' : ''}`}
                onClick={() => onJump?.(i)}
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
  );
}

export default Lightbox;
