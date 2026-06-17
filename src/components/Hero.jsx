import React, { useEffect, useRef, useState } from 'react';
import { stats } from '../data';
import './Hero.css';

const specialties = [
  'Laser Dentistry',
  'Invisalign',
  'Implants',
  'Cosmetic Care',
  'Orthodontics',
  'Periodontics',
];

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveIdx(i => (i + 1) % specialties.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" id="home">

      {/* Full-bleed BG image + overlays */}
      <div className="hero-bg" />
      <div className="hero-overlay-gradient" />
      <div className="hero-overlay-vignette" />

      {/* Main content */}
      <div className="hero-content">

        {/* Top badge */}
        <div className="hero-badge">
          <span className="badge-dot" />
          Trusted across Kerala · Est. 2018
        </div>

        {/* Big editorial headline */}
        <div className="hero-headline">
          <div className="headline-row row-1">
            <span className="hl-serif-italic">The</span>
            <span className="hl-serif-italic accent">Aesthetics</span>
          </div>
          <div className="headline-row row-2">
            OF YOUR <span className="hl-accent-word">SMILE</span>
          </div>
        </div>

        {/* Sub copy */}
        <p className="hero-sub">
          World-class dental care across Kochi, Calicut &amp; Kannur.<br />
          We combine precision medicine with genuine compassion.
        </p>

        {/* CTAs */}
        <div className="hero-cta-row">
          <button className="cta-primary" onClick={() => scrollTo('appointment')}>
            Book Free Consultation →
          </button>
          <button className="cta-ghost" onClick={() => scrollTo('services')}>
            Explore Services
          </button>
        </div>

        {/* Stats row */}
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

      {/* Circular rotating badge — top right */}
      <div className="circle-badge">
        <svg viewBox="0 0 120 120" className="circle-text-svg" aria-hidden="true">
          <path id="circlePath" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" fill="none" />
          <text>
            <textPath href="#circlePath" startOffset="0%">
              TRUSTED BY KERALA · SINCE 2018 · TRUSTED BY KERALA · SINCE 2018 ·
            </textPath>
          </text>
        </svg>
        <div className="circle-inner">
          <span className="circle-num">8K+</span>
          <span className="circle-label">Happy<br/>Patients</span>
        </div>
      </div>

      {/* Specialty chips — bottom left floating */}
      <div className="hero-chips">
        {specialties.map((s, i) => (
          <span key={s} className={`hero-chip${i === activeIdx ? ' active' : ''}`}>{s}</span>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>

    </section>
  );
}