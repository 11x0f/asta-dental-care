import React from 'react';
import { whyUs } from '../data';
import './WhyUs.css';

export default function WhyUs() {
  return (
    <section className="why">
      <div className="why-wrapper">
        <div className="why-content">
          <div className="section-eyebrow">Why Us</div>
          <h2 className="section-title">Your search for the best dentist ends here</h2>
          <p className="section-sub">
            We combine clinical excellence with genuine patient care so every visit
            leaves you healthier and more confident.
          </p>
        </div>
        <div className="why-grid">
          {whyUs.map(w => (
            <div key={w.title} className="why-card">
              <div className="why-card-icon">{w.icon}</div>
              <h4>{w.title}</h4>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
