import React from 'react';
import { testimonials } from '../data';
import './Testimonials.css';

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="section-header centered">
        <div className="section-eyebrow">Patient Stories</div>
        <h2 className="section-title">What our patients say</h2>
      </div>
      <div className="testimonials-viewport">
        <div className="testimonials-track">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={`${t.name}-${i}`} className="testi-card">
              <div className="testi-stars">{'★'.repeat(t.stars)}</div>
              <p className="testi-text">"{t.text}"</p>
              <div className="testi-author">— {t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
