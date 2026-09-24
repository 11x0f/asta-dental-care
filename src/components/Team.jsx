import React, { useEffect, useState } from 'react';
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

const toItem = doc => ({
  image: doc.photo || initialsAvatar(doc.initials, doc.color),
  label: doc.name,
  sublabel: doc.title,
  alt: `${doc.name}, ${doc.title} at Asta Dental Care, Kannur`,
  focus: doc.focus,
  sub: doc.sub,
  placeholder: !doc.photo,
});

// Reorder so Dr. Anurag Vinod (Chief Dental Surgeon) sits in the centre panel.
const centerName = 'Dr. Anurag Vinod';
const centerDoc = team.find(d => d.name === centerName);
const rest = team.filter(d => d.name !== centerName);
const mid = Math.ceil(rest.length / 2);
const orderedTeam = centerDoc
  ? [...rest.slice(0, mid), centerDoc, ...rest.slice(mid)]
  : team;
const centerIndex = orderedTeam.findIndex(d => d.name === centerName);

const items = orderedTeam.map(toItem);

// Mobile keeps the source order so Dr. Anurag Vinod leads the roster.
const mobileItems = team.map(toItem);
const mobileDefault = Math.max(team.findIndex(d => d.name === centerName), 0);

const MOBILE_QUERY = '(max-width: 720px)';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia(MOBILE_QUERY).matches
      : false
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = e => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}

function TeamMobile() {
  const [active, setActive] = useState(mobileDefault);
  const doc = mobileItems[active];

  return (
    <div className="team-mobile">
      <div className="team-feature" key={active}>
        <img
          className="team-feature__img"
          src={doc.image}
          alt={doc.alt}
          width="900"
          height="1200"
          loading="lazy"
          decoding="async"
          style={doc.focus ? { objectPosition: doc.focus } : undefined}
          draggable="false"
        />
        <div className="team-feature__overlay" aria-hidden="true" />
        <div className="team-feature__caption">
          <span className="team-feature__bar" aria-hidden="true" />
          <div className="team-feature__text">
            <span className="team-feature__name">{doc.label}</span>
            <span className="team-feature__role">{doc.sublabel}</span>
            {doc.sub && <span className="team-feature__sub">{doc.sub}</span>}
          </div>
        </div>
      </div>

      {/* The featured doctor is omitted here — the card above already shows them. */}
      <div className="team-thumbs" aria-label="Other specialists">
        {mobileItems.map((item, i) => (
          i === active ? null : (
            <button
              key={item.label}
              type="button"
              aria-label={`Show ${item.label} — ${item.sublabel}`}
              className={`team-thumb${item.placeholder ? ' team-thumb--placeholder' : ''}`}
              onClick={() => setActive(i)}
            >
              <img
                src={item.image}
                alt=""
                width="96"
                height="96"
                loading="lazy"
                decoding="async"
                style={item.focus ? { objectPosition: item.focus } : undefined}
                draggable="false"
              />
            </button>
          )
        ))}
      </div>
    </div>
  );
}

export default function Team() {
  const isMobile = useIsMobile();

  return (
    <section className="team" id="team">
      <div className="section-header centered">
        <div className="section-eyebrow">The Experts</div>
        <h2 className="section-title">Our Team of Specialists</h2>
        <p className="section-sub">
          Experienced. Compassionate. Committed to your smile.
        </p>
      </div>

      <div className="team-gallery">
        {isMobile ? (
          <TeamMobile />
        ) : (
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
        )}
      </div>
    </section>
  );
}
