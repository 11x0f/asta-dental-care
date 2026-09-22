import React, { useEffect, useRef } from 'react';
import './About.css';

const features = [
  'Committed to excellence in every procedure',
  'Cutting-edge technology and pain management',
  'Experienced dental specialists across every field',
  'Individualised treatment plans for every patient',
  'Free consultation, X-rays, and registration',
];

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => Math.min(1, Math.max(0, v));

export default function About() {
  const sectionRef = useRef(null);
  const shellRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let frameId;

    const tick = () => {
      const section = sectionRef.current;
      const shell = shellRef.current;
      const overlay = overlayRef.current;
      const content = contentRef.current;
      const label = labelRef.current;

      if (section && shell && overlay && content && label) {
        const rect = section.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const scrollRange = rect.height - viewportH || 1;
        const progress = clamp01(-rect.top / scrollRange);

        const width  = lerp(56, 100, progress);
        const height = lerp(46, 100, progress);
        const radius = lerp(36, 0, progress);
        shell.style.width = `${width}%`;
        shell.style.height = `${height}%`;
        shell.style.borderRadius = `${radius}px`;

        overlay.style.opacity = lerp(0.3, 0.82, progress).toFixed(3);

        const labelFade = 1 - clamp01(progress / 0.35);
        label.style.opacity = labelFade.toFixed(3);

        const reveal = clamp01((progress - 0.55) / 0.32);
        content.style.opacity = reveal.toFixed(3);
        content.style.transform = `translateY(${lerp(28, 0, reveal).toFixed(2)}px)`;
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-sticky">
        <div className="about-image-shell" ref={shellRef}>
          <img className="about-bg-image" src="/about_us_bg_light_theme.webp" alt="" draggable="false" />
          <div className="about-image-overlay" ref={overlayRef} />
          <div className="about-image-label" ref={labelRef}>About Us</div>
        </div>

        <div className="about-content" ref={contentRef}>
          <div className="section-eyebrow">About Us</div>
          <h2 className="section-title">Asta Dental Care</h2>
          <p className="section-sub">
            Kerala's premier multi-specialty dental clinic, offering
            state-of-the-art facilities and a team of dedicated specialists. Our mission: to exceed
            patient expectations with every visit.
          </p>
          <ul className="about-features">
            {features.map(f => <li key={f}>{f}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
