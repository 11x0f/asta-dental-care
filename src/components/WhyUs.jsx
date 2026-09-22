import React from 'react';
import { whyUs } from '../data';
import { whyIconMap } from './WhyIcons';
import './WhyUs.css';

const rotations = [-7, 5, -4, 8, -6, 3, -3, 6, -8, 4, -5, 7];

const wallImages = [
  { src: '/why-wall/1.webp', alt: 'Illustration of a dentist examining a patient' },
  { src: '/why-wall/2.webp', alt: 'Illustration of a dental probe near a tooth' },
  { src: '/why-wall/3.webp', alt: 'Illustration of a patient in a dental chair' },
  { src: '/why-wall/4.webp', alt: 'Illustration of a bright healthy smile' },
  { src: '/why-wall/5.webp', alt: 'Illustration of dental instruments on a tray' },
  { src: '/why-wall/6.webp', alt: 'Illustration of an electric toothbrush cleaning a tooth' },
  { src: '/why-wall/7.webp', alt: 'Illustration of a dental X-ray lightbox' },
  { src: '/why-wall/8.webp', alt: 'Illustration of a dentist with a child patient' },
  { src: '/why-wall/9.webp', alt: 'Illustration of a clear aligner on teeth' },
  { src: '/why-wall/10.webp', alt: 'Illustration of a dental clinic reception area' },
  { src: '/why-wall/11.webp', alt: 'Illustration of a tooth mascot with a shield' },
  { src: '/why-wall/12.webp', alt: 'Illustration of toothpaste and dental floss' }
];

const WALL_TILES = 24;

export default function WhyUs() {
  return (
    <section className="why">
      <div className="why-wall" aria-hidden="true">
        {Array.from({ length: WALL_TILES }).map((_, i) => {
          const img = wallImages[i % wallImages.length];
          return (
            <div
              key={i}
              className="why-wall-tile"
              style={{ '--rot': `${rotations[i % rotations.length]}deg` }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" draggable="false" />
            </div>
          );
        })}
      </div>

      <div className="why-wrapper">
        <div className="why-content">
          <div className="section-eyebrow">Why Us</div>
          <h2 className="section-title">Your search for the best dentist ends here</h2>
          <p className="section-sub">
            We combine clinical excellence with genuine patient care so every visit
            leaves you healthier and more confident.
          </p>
          <div className="why-progress" aria-hidden="true">
            <span className="why-progress-fill" />
          </div>
        </div>
        <div className="why-grid">
          {whyUs.map(w => {
            const Icon = whyIconMap[w.icon];
            return (
              <div key={w.title} className="why-card" style={{ '--accent': w.accent }}>
                <div className="why-card-body">
                  <div className="why-card-icon">
                    <Icon />
                  </div>
                  <h4>{w.title}</h4>
                  <p>{w.desc}</p>
                </div>
                <div className="why-card-media">
                  <img src={w.image} alt="" draggable="false" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
