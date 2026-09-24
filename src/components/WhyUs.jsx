import React from 'react';
import { whyUs } from '../data';
import { whyIconMap } from './WhyIcons';
import './WhyUs.css';

const rotations = [-7, 5, -4, 8, -6, 3, -3, 6, -8, 4, -5, 7];

/* Decorative backdrop tiles. Intrinsic dimensions are declared so the browser
   reserves the right aspect ratio before the bytes arrive (avoids layout
   shift); alt text lives on the <img> as "" because the whole wall is
   aria-hidden. */
const wallImages = [
  { src: '/why-wall/1.webp',  w: 1024, h: 1536 },
  { src: '/why-wall/2.webp',  w: 1024, h: 1536 },
  { src: '/why-wall/3.webp',  w: 1024, h: 1536 },
  { src: '/why-wall/4.webp',  w: 1024, h: 1536 },
  { src: '/why-wall/5.webp',  w: 1024, h: 1536 },
  { src: '/why-wall/6.webp',  w: 1024, h: 1536 },
  { src: '/why-wall/7.webp',  w: 1024, h: 1536 },
  { src: '/why-wall/8.webp',  w: 1024, h: 1536 },
  { src: '/why-wall/9.webp',  w: 1536, h: 1024 },
  { src: '/why-wall/10.webp', w: 1536, h: 1024 },
  { src: '/why-wall/11.webp', w: 1024, h: 1536 },
  { src: '/why-wall/12.webp', w: 1149, h: 1369 }
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
              <img
                src={img.src}
                alt=""
                width={img.w}
                height={img.h}
                loading="lazy"
                decoding="async"
                draggable="false"
              />
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
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
                <div className="why-card-media">
                  <img
                    src={w.image}
                    alt=""
                    width="1149"
                    height="1369"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
