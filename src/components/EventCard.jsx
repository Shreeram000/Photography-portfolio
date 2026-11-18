import React from 'react';
import { getPhotoSrc } from '../utils/photoUtils';

function EventCard({ event, onClick }) {
  const coverSrc = getPhotoSrc(event.photos[0]);

  return (
    <div className="event-card" onClick={onClick}>
      <div className="card-cover">
        {coverSrc ? (
          <img src={coverSrc} alt={event.name} loading="lazy" />
        ) : (
          <div className="ph-cross" style={{ minHeight: 'unset', height: '100%' }}>
            <span className="ph-text">Cover Photo</span>
          </div>
        )}
        <div className="card-cover-overlay"><span>↗</span></div>
        <div className="card-photo-count">
          {event.photos.length} photo{event.photos.length !== 1 ? 's' : ''}
        </div>
      </div>
      <div className="card-info">
        <div>
          <div className="card-name">{event.name}</div>
          <div className="card-meta">{event.year} · {event.loc}</div>
        </div>
        <div className="card-arrow">↗</div>
      </div>
    </div>
  );
}

export default EventCard;
