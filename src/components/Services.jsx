import React from 'react';
import { services } from '../data';
import './Services.css';

const serviceVisuals = {
  'Laser Dentistry':      { image: '/services/laser.png',         color: '#38bdf8' },
  'Cosmetic Treatments':  { image: '/services/cosmetic.png',      color: '#c084fc' },
  'Maxillofacial Surgery':{ image: '/services/maxillofacial.png', color: '#60a5fa' },
  'Invisalign':           { image: '/services/invisalign.png',    color: '#2dd4bf' },
  'Periodontics':         { image: '/services/periodontics.png',  color: '#fb923c' },
  'Paediatric Dentistry': { image: '/services/paediatric.png',    color: '#f472b6' },
  'Oral Radiology':       { image: '/services/radiology.png',     color: '#818cf8' },
  'Endodontics':          { image: '/services/endodontics.png',   color: '#a8a29e' },
  'Prosthodontics':       { image: '/services/prosthodontics.png',color: '#22d3ee' },
  'Orthodontics':         { image: '/services/orthodontics.png',  color: '#4ade80' },
  'Restorative Dentistry':{ image: '/services/restorative.png',   color: '#f87171' },
};

export default function Services() {
  // Duplicate for seamless infinite loop
  const doubled = [...services, ...services];

  return (
    <section className="services" id="services">
      <div className="section-header centered">
        <div className="section-eyebrow">What We Offer</div>
        <h2 className="section-title">Our Range of Dental Services</h2>
        <p className="section-sub">
          From routine check-ups to complex surgeries, our specialists cover every aspect of your oral health.
        </p>
      </div>

      <div className="marquee-wrapper">
        {/* Fade edges */}
        <div className="marquee-fade left" />
        <div className="marquee-fade right" />

        <div className="marquee-track">
          {doubled.map((s, i) => {
            const v = serviceVisuals[s.title] || { gradient: 'linear-gradient(135deg, #0c1a2e, #1e3a5f)', icon: '🦷', color: '#38bdf8' };
            return (
              <div className="service-card" key={i} aria-hidden={i >= services.length}>
                <img src={v.image} alt={s.title} className="card-bg-img" />
                <div className="card-scrim" />
                <div className="card-visual-glow" style={{ background: v.color }} />

                {/* Content sits directly on the image */}
                <div className="card-content">
                  <div className="card-tag" style={{ color: v.color, background: `${v.color}20`, borderColor: `${v.color}40` }}>
                    Specialty
                  </div>
                  <h3 className="card-title">{s.title}</h3>
                  <p className="card-desc">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}