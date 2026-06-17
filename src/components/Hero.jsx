import React from 'react';
import { services, stats } from '../data';
import './Hero.css';

const heroPills = ['Laser', 'Invisalign', 'Implants', 'Cosmetic', 'Orthodontics'];

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Trusted across Kerala
        </div>
        <h1>Unlock Your<br /><em>Brightest Smile</em></h1>
        <p className="hero-sub">
          World-class dental care across Kochi, Calicut, and Kannur —
          with cutting-edge technology and specialists who put you at ease.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo('appointment')}>
            Book a Free Consultation
          </button>
          <button className="btn-ghost" onClick={() => scrollTo('services')}>
            Explore Services
          </button>
        </div>
        <div className="hero-stats">
          {stats.map(s => (
            <div key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-card-stack">
          <div className="hero-main-card">
            <div className="tooth-icon">🦷</div>
            <div>
              <div className="hero-card-title">Advanced Care</div>
              <div className="hero-card-desc">
                State-of-the-art laser dentistry, Invisalign, implants, and cosmetic treatments — all under one roof.
              </div>
            </div>
            <div className="service-pills">
              {heroPills.map(t => <span key={t} className="pill">{t}</span>)}
            </div>
          </div>
          <div className="hero-card-accent">
            <div className="card-label">Available Now</div>
            <div className="card-value">3 Locations</div>
            <div className="card-sub">Kochi · Calicut · Kannur</div>
          </div>
        </div>
      </div>
    </section>
  );
}
