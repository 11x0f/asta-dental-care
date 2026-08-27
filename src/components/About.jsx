import React from 'react';
import './About.css';

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
