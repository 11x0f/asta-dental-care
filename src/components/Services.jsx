import React from 'react';
import { services } from '../data';
import './Services.css';

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="section-header centered">
        <div className="section-eyebrow">What We Offer</div>
        <h2 className="section-title">Our Range of Dental Services</h2>
        <p className="section-sub">
          From routine check-ups to complex surgeries, our specialists cover every aspect of your oral health.
        </p>
      </div>
      <div className="services-grid">
        {services.map(s => (
          <div key={s.title} className="service-card">
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
