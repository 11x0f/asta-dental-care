import React from 'react';
import { locations } from '../data';
import './Locations.css';

export default function Locations() {
  return (
    <section className="locations section" id="locations">
      <div className="section-header centered">
        <div className="section-eyebrow">Find Us</div>
        <h2 className="section-title">Visit Us</h2>
        <p className="section-sub">
          Come in, we'll take it from there.
        </p>
      </div>
      <div className="locations-grid">
        {locations.map(l => (
          <div key={l.name} className="location-card">
            <div className="location-icon">{l.icon}</div>
            <h3>{l.name}</h3>
            <address>{l.address}</address>
            <a href={l.map} target="_blank" rel="noreferrer" className="location-link">
              Get Directions →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
