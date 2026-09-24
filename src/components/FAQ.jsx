import React, { useState } from 'react';
import { faqs } from '../data';
import './FAQ.css';

/* The answer stays mounted and is hidden with the `hidden` attribute rather
   than being conditionally rendered. Unmounting it kept every answer out of
   the DOM entirely, so crawlers never saw the text that the FAQPage JSON-LD
   in public/index.html claims is on this page — structured data that does not
   match visible content is a rich-result violation. Collapsed accordion text
   is indexed normally. */
function FAQItem({ q, a, id }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-a-${id}`;
  const btnId = `faq-q-${id}`;
  return (
    <div className="faq-item">
      <button
        type="button"
        className="faq-q"
        id={btnId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        {q}
        <span className={`faq-icon${open ? ' open' : ''}`} aria-hidden="true">+</span>
      </button>
      <p className="faq-a" id={panelId} role="region" aria-labelledby={btnId} hidden={!open}>
        {a}
      </p>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="faq" id="faq">
      <div className="section-header centered">
        <div className="section-eyebrow">Common Questions</div>
        <h2 className="section-title">Frequently Asked Questions</h2>
      </div>
      <div className="faq-list">
        {faqs.map((f, i) => <FAQItem key={f.q} id={i} {...f} />)}
      </div>
    </section>
  );
}
