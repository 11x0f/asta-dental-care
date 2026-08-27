import React, { useEffect, useRef } from 'react';
import { team } from '../data';
import './Team.css';

const PLACEHOLDER_PHOTO = '/Team/arurag_vinod_kumar.png';

const RANGE_MULT = 2.6;
const MAX_SCALE = 1.18;
const MIN_SCALE = 0.72;
const MAX_DIM = 0.6;
const MAX_DARKEN = 0.45;

export default function Team() {
  const doubled = [...team, ...team];
  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addCardRef = (el) => {
    if (el) cardRefs.current.push(el);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let frameId;

    const tick = () => {
      const wrapper = wrapperRef.current;
      if (wrapper) {
        const wrapperRect = wrapper.getBoundingClientRect();
        const centerX = wrapperRect.left + wrapperRect.width / 2;

        cardRefs.current.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const dist = Math.abs(cardCenterX - centerX);
          const range = rect.width * RANGE_MULT || 1;
          const t = Math.min(dist / range, 1);

          const scale = MAX_SCALE - (MAX_SCALE - MIN_SCALE) * t;
          const opacity = 1 - MAX_DIM * t;
          const brightness = 1 - MAX_DARKEN * t;
          const zIndex = Math.max(1, 1000 - Math.round(dist));

          card.style.transform = `scale(${scale.toFixed(3)})`;
          card.style.opacity = opacity.toFixed(3);
          card.style.filter = `brightness(${brightness.toFixed(3)})`;
          card.style.zIndex = zIndex;
        });
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="team" id="team">
      <div className="section-header centered">
        <div className="section-eyebrow">The Experts</div>
        <h2 className="section-title">Our Team of Specialists</h2>
        <p className="section-sub">
          Highly qualified professionals who bring warmth and precision to every appointment.
        </p>
      </div>

      <div className="team-marquee-wrapper" ref={wrapperRef}>
        <div className="marquee-fade left" />
        <div className="marquee-fade right" />

        <div className="team-marquee-track">
          {doubled.map((doc, i) => (
            <div className="doctor-card" ref={addCardRef} key={i} aria-hidden={i >= team.length}>
              <div className="doctor-avatar">
                <img className="doctor-photo" src={PLACEHOLDER_PHOTO} alt={doc.name} draggable="false" />
              </div>
              <div className="doctor-card-vignette" />

              <div className="doctor-label">
                <h3 className="doctor-name">{doc.name}</h3>
                <div className="doctor-title" style={{ color: doc.color }}>{doc.title}</div>
                {doc.sub && <div className="doctor-sub">{doc.sub}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
