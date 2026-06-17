import React from 'react';
import { team } from '../data';
import './Team.css';

export default function Team() {
  return (
    <section className="team section" id="team">
      <div className="section-header centered">
        <div className="section-eyebrow">The Experts</div>
        <h2 className="section-title">Our Team of Specialists</h2>
        <p className="section-sub">
          Highly qualified professionals who bring warmth and precision to every appointment.
        </p>
      </div>
      <div className="team-grid">
        {team.map(t => (
          <div key={t.name} className="team-card">
            <div className="team-avatar">{t.emoji}</div>
            <h4>{t.name}</h4>
            <div className="team-role">{t.role}</div>
            <div className="team-creds">{t.creds}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
