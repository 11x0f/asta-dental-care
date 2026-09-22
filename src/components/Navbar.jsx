import React, { useState, useEffect } from 'react';
import './Navbar.css';

const links = [
  { label: 'Services',  id: 'services' },
  { label: 'About',     id: 'about' },
  { label: 'Team',      id: 'team' },
  { label: 'Book Appointment', id: 'appointment' },
  { label: 'FAQ',       id: 'faq' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [hidden,    setHidden]    = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState('');

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = Math.max(window.scrollY, 0);
      setScrolled(y > 40);
      // Ignore tiny jitters so the bar doesn't flicker mid-scroll
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 120);
        lastY = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}${hidden && !menuOpen ? ' hidden' : ''}`}>
        <a href="#home" className="nav-logo" onClick={() => scrollTo('home')}>
          <img src="/logo.webp" alt="" className="nav-logo-mark" />
          Asta <span>Dental</span> Care
        </a>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={active === l.id ? 'active' : ''}
                onClick={e => { e.preventDefault(); scrollTo(l.id); }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button className="nav-cta" onClick={() => scrollTo('appointment')}>
            Book Appointment
          </button>
        </div>

        <button
          className={`nav-mobile-btn${menuOpen ? ' open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${menuOpen ? ' open' : ''}`}>
        <ul>
          {links.map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={e => { e.preventDefault(); scrollTo(l.id); }}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="drawer-cta" onClick={() => scrollTo('appointment')}>
          Book Appointment
        </button>
      </div>
      {menuOpen && <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} />}
    </>
  );
}