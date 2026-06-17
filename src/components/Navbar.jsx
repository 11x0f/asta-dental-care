import React from 'react';
import './Navbar.css';

export default function Navbar() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav className="nav">
      <a href="#home" className="nav-logo">ASTA <span>Dental</span>CARE </a>
      <ul className="nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#team">Team</a></li>
        <li><a href="#locations">Locations</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <button className="nav-cta" onClick={() => scrollTo('appointment')}>
        Book Appointment
      </button>
      <button className="nav-mobile-btn" aria-label="Menu">☰</button>
    </nav>
  );
}
