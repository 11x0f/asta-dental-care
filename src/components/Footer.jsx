import React from 'react';
import { locations, services } from '../data';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">Asta <span>Dental</span> Care</div>
          <p>Kerala's premier multi-specialty dental clinic. Exceptional care across Kochi, Calicut, and Kannur.</p>
        </div>
        <div className="footer-col">
          <h5>Services</h5>
          <ul>
            {services.slice(0, 5).map(s => (
              <li key={s.title}><a href="#services">{s.title}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h5>Clinics</h5>
          <ul>
            {locations.map(l => (
              <li key={l.name}><a href="#locations">{l.name}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h5>Contact</h5>
          <ul>
            <li><a href="tel:+918714608881" className="footer-phone">+91 87146 08881</a></li>
            <li><a href="#appointment">Book Appointment</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Asta Dental Care. All rights reserved.</span>
        <span>Mon–Sat 9:30 AM–9 PM · Sun 10 AM–7 PM</span>
      </div>
    </footer>
  );
}
