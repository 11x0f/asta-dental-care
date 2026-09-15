import React from 'react';
import { locations } from '../data';
import './Footer.css';

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.2 3.2" />
  </svg>
);

export default function Footer() {
  const location = locations[0];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/logo.png" alt="" className="footer-logo-mark" />
            Asta <span>Dental</span> Care
          </div>
          <p>Kerala's premier multi-specialty dental clinic, offering exceptional care in Kannur.</p>
        </div>
        <div className="footer-col footer-visit">
          <h5>Visit Us</h5>
          <div className="footer-info-list">
            <div className="footer-info-row">
              <span className="footer-icon"><IconPin /></span>
              <div>
                <address className="footer-address">{location.address}</address>
                <a href={location.map} target="_blank" rel="noreferrer" className="footer-directions">Get Directions →</a>
              </div>
            </div>
            <div className="footer-info-row">
              <span className="footer-icon"><IconClock /></span>
              <span className="footer-hours">Mon–Sat 9:30 AM–6:30 PM<br />Sun 9:30 AM–2 PM</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Asta Dental Care. All rights reserved.</span>
      </div>
    </footer>
  );
}
