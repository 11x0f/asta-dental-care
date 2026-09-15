import React from 'react';
import { team } from '../data';
import AccordionGallery from './AccordionGallery';
import './Team.css';

function initialsAvatar(initials, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
    <rect width="600" height="800" fill="${color}" />
    <text x="300" y="440" font-family="Georgia, 'DM Serif Display', serif" font-size="220"
      fill="#0b0b0f" text-anchor="middle">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Reorder so Dr. Anurag Vinod (Chief Dental Surgeon) sits in the centre panel.
const centerName = 'Dr. Anurag Vinod';
const centerDoc = team.find(d => d.name === centerName);
const rest = team.filter(d => d.name !== centerName);
const mid = Math.ceil(rest.length / 2);
const orderedTeam = centerDoc
  ? [...rest.slice(0, mid), centerDoc, ...rest.slice(mid)]
  : team;
const centerIndex = orderedTeam.findIndex(d => d.name === centerName);

const items = orderedTeam.map(doc => ({
  image: doc.photo || initialsAvatar(doc.initials, doc.color),
  label: doc.name,
  sublabel: doc.title,
  alt: doc.name,
}));

export default function Team() {
  return (
    <section className="team" id="team">
      <div className="section-header centered">
        <div className="section-eyebrow">The Experts</div>
        <h2 className="section-title">Our Team of Specialists</h2>
      </div>

      <div className="team-gallery">
        <AccordionGallery
          items={items}
          defaultIndex={centerIndex >= 0 ? centerIndex : 0}
          accentColor="#38bdf8"
          overlayColor="#040d17"
          textColor="#ffffff"
          height={520}
          gap={12}
          radius={24}
          expandRatio={0.46}
          tilt={6}
          parallax={0.4}
        />
      </div>
    </section>
  );
}
