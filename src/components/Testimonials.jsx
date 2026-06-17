import React from 'react';
import { testimonials } from '../data';
import './Testimonials.css';

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="section-header">
        <div className="section-eyebrow">Patient Stories</div>
        <h2 className="section-title">What our patients say</h2>
      </div>
      <div className="testimonials-track">
        {testimonials.map(t => (
          <div key={t.name} className="testi-card">
            <div className="testi-stars">{'★'.repeat(t.stars)}</div>
            <p className="testi-text">"{t.text}"</p>
            <div className="testi-author">— {t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
