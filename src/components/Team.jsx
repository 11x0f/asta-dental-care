import React from 'react';
import { team } from '../data';
import './Team.css';

const teamVisuals = {
  'Dr. Vipin Viswanath':   { image: '/doctors/vipin.png',    color: '#38bdf8', specialty: 'Oral & Maxillofacial' },
  'Dr. Jafar Hamza':       { image: '/doctors/jafar.png',    color: '#c084fc', specialty: 'Clinical Director' },
  'Dr. Amal Sidharth':     { image: '/doctors/amal.png',     color: '#2dd4bf', specialty: 'Pedodontist' },
  'Dr. Sreenath Narayanan':{ image: '/doctors/sreenath.png', color: '#818cf8', specialty: 'Endodontist' },
  'Dr. Megha C':           { image: '/doctors/megha.png',    color: '#f472b6', specialty: 'Pediatric Dentistry' },
  'Dr. Fathima Nifla C.P': { image: '/doctors/fathima.png',  color: '#fb923c', specialty: 'Endodontist' },
};

export default function Team() {
  const doubled = [...team, ...team];

  return (
    <section className="team" id="team">
      <div className="section-header centered">
        <div className="section-eyebrow">The Experts</div>
        <h2 className="section-title">Our Team of Specialists</h2>
        <p className="section-sub">
          Highly qualified professionals who bring warmth and precision to every appointment.
        </p>
      </div>

      <div className="team-marquee-wrapper">
        <div className="marquee-fade left" />
        <div className="marquee-fade right" />

        <div className="team-marquee-track">
          {doubled.map((t, i) => {
            const v = teamVisuals[t.name] || { image: '/doctors/default.png', color: '#38bdf8', specialty: t.role };
            return (
              <div className="doctor-card" key={i} aria-hidden={i >= team.length}>
                {/* Photo */}
                <div className="doctor-photo">
                  <img src={v.image} alt={t.name} className="doctor-img" />
                  <div className="doctor-photo-overlay" />
                  <div className="doctor-glow" style={{ background: v.color }} />
                </div>

                {/* Info */}
                <div className="doctor-info">
                  <div className="doctor-specialty-tag" style={{ color: v.color, background: `${v.color}15`, borderColor: `${v.color}30` }}>
                    {v.specialty}
                  </div>
                  <h3 className="doctor-name">{t.name}</h3>
                  <div className="doctor-role">{t.role}</div>
                  <div className="doctor-creds">{t.creds}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}