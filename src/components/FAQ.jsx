import React, { useState } from 'react';
import { faqs } from '../data';
import './FAQ.css';

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-q" onClick={() => setOpen(!open)}>
        {q}
        <span className={`faq-icon${open ? ' open' : ''}`}>+</span>
      </button>
      {open && <p className="faq-a">{a}</p>}
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
        {faqs.map(f => <FAQItem key={f.q} {...f} />)}
      </div>
    </section>
  );
}
