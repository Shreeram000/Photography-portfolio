import React from 'react';
import { EVENTS } from '../data';
import EventCard from './EventCard';

function Events({ events = EVENTS, onSelectEvent }) {
  return (
    <section id="events">
      <div className="section-header">
        <span className="section-num">01 /</span>
        <span className="section-title">Events</span>
        <span className="section-rule"></span>
        <span className="section-count">{events.length} EVENTS</span>
      </div>
      <div className="events-grid" id="events-grid">
        {events.map((ev, ei) => (
          <EventCard
            key={ei}
            event={ev}
            onClick={() => onSelectEvent && onSelectEvent(ei)}
          />
        ))}
      </div>
    </section>
  );
}

export default Events;
