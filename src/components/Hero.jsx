import React, { useEffect, useState } from 'react';
import { stats } from '../data';
import './Hero.css';

const specialties = ['Laser Dentistry','Invisalign','Implants','Cosmetic Care','Orthodontics','Periodontics'];

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveIdx(i => (i + 1) % specialties.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" id="home">

      <div className="hero-bg" />
      <div className="hero-overlay-gradient" />
      <div className="hero-overlay-vignette" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Trusted by Thousands · Est. 2024
        </div>

        <div className="hero-headline">
          <div className="headline-row row-1">
            <span className="hl-serif-italic">The</span>
            <span className="hl-serif-italic accent">Aesthetics</span>
          </div>
          <div className="headline-row row-2">
            OF YOUR <span className="hl-accent-word">SMILE</span>
          </div>
        </div>

        <p className="hero-sub">
          World-class dental care in the heart of Kannur.<br />
          We combine precision medicine with genuine compassion.
        </p>

        <div className="hero-cta-row">
          <button className="cta-primary" onClick={() => scrollTo('appointment')}>Book Free Consultation →</button>
          <button className="cta-ghost"   onClick={() => scrollTo('services')}>Explore Services</button>
        </div>

        <div className="hero-stats">
          {stats.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className="hero-stat">
                <span className="stat-n">{s.num}</span>
                <span className="stat-l">{s.label}</span>
              </div>
              {i < stats.length - 1 && <div className="stat-div" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="circle-badge">
        <svg viewBox="0 0 120 120" className="circle-text-svg" aria-hidden="true">
          <path id="circlePath" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" fill="none" />
          <text><textPath href="#circlePath" startOffset="0%"> TRUSTED BY KANNUR   ·   SINCE 2024   ·   </textPath></text>
        </svg>
        <div className="circle-inner">
          <span className="circle-num">3K+</span>
          <span className="circle-label">Happy<br/>Patients</span>
        </div>
      </div>

      <div className="hero-chips">
        {specialties.map((s, i) => (
          <span key={s} className={`hero-chip${i === activeIdx ? ' active' : ''}`}>{s}</span>
        ))}
      </div>

      <div className="scroll-hint">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>

    </section>
  );
}