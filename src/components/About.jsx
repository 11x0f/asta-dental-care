import React from 'react';
import './About.css';

const aboutStats = [
  { num: '2800+', label: 'Dental Fillings', accent: true },
  { num: '1200+', label: 'Tooth Extractions', accent: false },
  { num: '3K+',   label: 'Root Canals', accent: false },
  { num: '2100+', label: 'Implants Placed', accent: true },
];

const features = [
  'Committed to excellence in every procedure',
  'Cutting-edge technology and pain management',
  'Experienced dental specialists across every field',
  'Individualised treatment plans for every patient',
  'Free consultation, X-rays, and registration',
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-visual">
        <div className="about-grid">
          {aboutStats.map(s => (
            <div key={s.label} className={`about-block${s.accent ? ' accent' : ''}`}>
              <div className="about-block-title">{s.num}</div>
              <div className="about-block-sub">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="about-content">
        <div className="section-eyebrow">About Us</div>
        <h2 className="section-title">Asta Dental Care</h2>
        <p className="section-sub">
          Kerala's premier multi-specialty dental clinic, serving Kochi, Calicut, and Kannur with
          state-of-the-art facilities and a team of dedicated specialists. Our mission: to exceed
          patient expectations with every visit.
        </p>
        <ul className="about-features">
          {features.map(f => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </section>
  );
}
