import React, { useCallback, useEffect, useRef, useState } from 'react';
import { services, team } from '../data';
import { business } from '../data/site';
import {
  apptIconMap, CalendarIcon, ClockIcon, SuccessIcon,
  ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon
} from './ApptIcons';
import './Appointment.css';

const SLOT_DURATION = 30;
const WORK_HOURS = { start: 9.5, end: 18.5 };
const SUN_HOURS  = { start: 9.5, end: 14 };

function generateSlots(date) {
  const isSunday = date.getDay() === 0;
  const { start, end } = isSunday ? SUN_HOURS : WORK_HOURS;
  const slots = [];
  for (let t = start; t < end; t += SLOT_DURATION / 60) {
    const h = Math.floor(t);
    const m = Math.round((t - h) * 60);
    const ampm = h < 12 ? 'am' : 'pm';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    slots.push(`${displayH}:${m.toString().padStart(2, '0')}${ampm}`);
  }
  return slots;
}

const DAYS   = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

function calendarDays(year, month) {
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays    = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: prevDays - i, cur: false });
  for (let i = 1; i <= daysInMonth; i++)  cells.push({ day: i, cur: true });
  while (cells.length % 7 !== 0) cells.push({ day: cells.length - daysInMonth - firstDay + 1, cur: false });
  return cells;
}

/* ── Mobile date strip ──
   Phones never get the month grid: they get a horizontal rail that starts on
   today and runs forward only. STRIP_DAYS is four weeks of runway; the arrows
   step exactly one week at a time. */
const STRIP_DAYS = 28;
const STRIP_WEEK = 7;
const MOBILE_QUERY = '(max-width: 640px)';

function stripDates(from, count) {
  const base = new Date(from);
  base.setHours(0, 0, 0, 0);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    return d;
  });
}

/* Distance from one pill's left edge to the next — width + gap, read from the
   DOM so the CSS stays the single source of truth for pill sizing. */
function stripPitch(el) {
  if (!el) return 0;
  if (el.children.length > 1) return el.children[1].offsetLeft - el.children[0].offsetLeft;
  return el.clientWidth || 0;
}

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

/* ── WhatsApp handoff ──
   No API, no backend: we build the message from live form state, encode it and
   hand off to wa.me, which resolves to the native app on phones and WhatsApp
   Web on desktop. */
const WA_NUMBER = business.whatsapp;
const WA_RULE   = '─'.repeat(20);

function to24(slot) {
  const [time, ampm] = [slot.slice(0, -2), slot.slice(-2)];
  let [h, m] = time.split(':').map(Number);
  if (ampm === 'pm' && h !== 12) h += 12;
  if (ampm === 'am' && h === 12) h = 0;
  return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
}

// "23 September 2026"
const waDate = d => d
  ? d.toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })
  : '';

// "9:30 AM" (or "09:30" when the user is on the 24h toggle)
const waTime = (slot, fmt) => !slot ? ''
  : fmt === '24h' ? to24(slot)
  : slot.replace(/(am|pm)$/, m => ` ${m.toUpperCase()}`);

function buildWaMessage({ date, time, name, phone, doctor, service, message }) {
  const lines = [
    'Hello Asta Dental Care,', '',
    'I would like to request an appointment.', '',
    'Appointment Details', WA_RULE,
    `Date: ${date}`,
    `Time: ${time}`, '',
    'Patient Details', WA_RULE,
    `Full Name: ${name}`,
    `Phone Number: ${phone}`,
  ];
  // Optional fields are omitted entirely when blank — never sent as empty rows.
  const extras = [
    doctor  && `Doctor: ${doctor}`,
    service && `Service: ${service}`,
    message && `Message: ${message}`,
  ].filter(Boolean);
  if (extras.length) lines.push('', ...extras);
  lines.push('', 'Please confirm my appointment.', '', 'Thank you.');
  return lines.join('\n');
}

const apptFeatures = [
  { icon: 'clock', accent: '#38bdf8', text: 'Mon – Sat: 9:30 AM – 6:30 PM' },
  { icon: 'calendar', accent: '#818cf8', text: 'Sunday: 9:30 AM – 2:00 PM' },
  { icon: 'phone', accent: '#f472b6', text: business.phoneDisplay },
  { icon: 'check', accent: '#22c55e', text: 'Free consultation & registration' },
];

export default function Appointment() {
  const today = new Date();
  const [step, setStep]           = useState('calendar');
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selDate, setSelDate]     = useState(null);
  const [selSlot, setSelSlot]     = useState(null);
  const [fmt, setFmt]             = useState('12h');
  const [formData, setFormData]   = useState({ name:'', phone:'', doctor:'', service:'', message:'' });
  const [errors, setErrors]       = useState({});
  const [sending, setSending]     = useState(false);
  const handoffTimer              = useRef(null);
  useEffect(() => () => clearTimeout(handoffTimer.current), []);

  const isMobile = useIsMobile();
  const stripRef = useRef(null);
  const [strip, setStrip] = useState({ index: 0, atStart: true, atEnd: false });

  const cells = calendarDays(viewYear, viewMonth);
  const stripDays = isMobile ? stripDates(today, STRIP_DAYS) : [];
  const stripCursor = stripDays[strip.index] || today;

  const isPast = (day) => {
    const d = new Date(viewYear, viewMonth, day); d.setHours(0,0,0,0);
    const t = new Date(); t.setHours(0,0,0,0);
    return d < t;
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const syncStrip = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    const pitch = stripPitch(el) || 1;
    setStrip({
      index: Math.max(0, Math.min(STRIP_DAYS - 1, Math.round(el.scrollLeft / pitch))),
      atStart: el.scrollLeft <= 2,
      atEnd: el.scrollLeft >= el.scrollWidth - el.clientWidth - 2,
    });
  }, []);

  // Settle the arrows once the rail has been laid out (and after a rotation).
  useEffect(() => {
    if (!isMobile) return;
    syncStrip();
    window.addEventListener('resize', syncStrip);
    return () => window.removeEventListener('resize', syncStrip);
  }, [isMobile, syncStrip]);

  const scrollWeek = (dir) => {
    const el = stripRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({
      left: dir * stripPitch(el) * STRIP_WEEK,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  const pickDate = (d) => {
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
    setSelDate(d);
    setSelSlot(null);
    setStep('time');
  };

  const selectDate = (day, cur) => {
    if (!cur || isPast(day)) return;
    setSelDate(new Date(viewYear, viewMonth, day));
    setSelSlot(null);
    setStep('time');
  };

  const displaySlot = s => fmt === '24h' ? to24(s) : s;
  const slots = selDate ? generateSlots(selDate) : [];

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    // Clear a field's error the moment the patient starts fixing it.
    setErrors(p => {
      if (!p[name]) return p;
      const rest = { ...p };
      delete rest[name];
      return rest;
    });
  };

  const validate = () => {
    const next = {};
    if (!selDate) next.date = 'Please pick an appointment date.';
    if (!selSlot) next.time = 'Please pick a time slot.';
    if (!formData.name.trim())  next.name  = 'Please enter your full name.';
    if (!formData.phone.trim()) next.phone = 'Please enter your phone number.';
    else if (formData.phone.replace(/\D/g, '').length < 10) {
      next.phone = 'Enter a valid number with at least 10 digits.';
    }
    return next;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (sending) return;

    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      const first = ['name','phone'].find(k => next[k]);
      if (first) e.currentTarget.elements[first]?.focus();
      return;
    }

    const text = buildWaMessage({
      date:    waDate(selDate),
      time:    waTime(selSlot, fmt),
      name:    formData.name.trim(),
      phone:   formData.phone.trim(),
      doctor:  formData.doctor.trim(),
      service: formData.service.trim(),
      message: formData.message.trim(),
    });
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

    // Lock the button so a double-tap can't spawn two handoffs.
    setSending(true);
    // No 'noopener' in the feature string: it makes window.open return null even
    // on success, which would defeat the popup-blocked check below. Sever the
    // opener reference afterwards instead.
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    else window.location.href = url; // popup blocked — hand off in place
    handoffTimer.current = setTimeout(() => {
      setSending(false);
      setStep('confirmed');
    }, 1200);
  };

  const reset = () => {
    clearTimeout(handoffTimer.current);
    setStep('calendar'); setSelDate(null); setSelSlot(null);
    setStrip({ index: 0, atStart: true, atEnd: false });
    setErrors({}); setSending(false);
    setFormData({ name:'', phone:'', doctor:'', service:'', message:'' });
  };

  return (
    <section className="appointment" id="appointment">
      <div className="appt-wrapper">

        {/* LEFT */}
        <div className="appt-info">
          <div className="section-eyebrow appt-eyebrow">Get Started</div>
          <h2 className="section-title">Book Your Appointment</h2>
          <p className="section-sub appt-sub">
            Free consultation, X-rays, and registration. Pick a date and time that works for you.
          </p>
          <div className={`appt-features${selDate ? ' is-collapsed' : ''}`}>
            {apptFeatures.map(f => {
              const Icon = apptIconMap[f.icon];
              return (
                <div key={f.text} className="appt-feature">
                  <div className="appt-feature-icon" style={{ '--accent': f.accent }}>
                    <Icon />
                  </div>
                  {f.text}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className="appt-form">

          {/* Steps 1 & 2: Calendar + Time */}
          {(step === 'calendar' || step === 'time') && (
            <div className="booking-card">
              <div className="cal-time-wrapper">

                {/* Mobile: forward-only date rail. Desktop: month grid. */}
                {isMobile ? (
                <div className="strip-panel">
                  <div className="strip-head">
                    <span className="cal-month">
                      <strong>{MONTHS[stripCursor.getMonth()]}</strong> {stripCursor.getFullYear()}
                    </span>
                    <div className="strip-nav">
                      <button className="cal-nav-btn" onClick={() => scrollWeek(-1)}
                        disabled={strip.atStart} aria-label="Previous week">
                        <ChevronLeftIcon />
                      </button>
                      <button className="cal-nav-btn" onClick={() => scrollWeek(1)}
                        disabled={strip.atEnd} aria-label="Next week">
                        <ChevronRightIcon />
                      </button>
                    </div>
                  </div>

                  <div className="date-strip" ref={stripRef} onScroll={syncStrip}
                    role="group" aria-label="Choose an appointment date">
                    {stripDays.map((d, i) => {
                      const isSel = selDate && d.toDateString() === selDate.toDateString();
                      const tag = i === 0 ? 'Today'
                        : i === 1 ? 'Tmrw'
                        : d.getDate() === 1 ? MONTHS[d.getMonth()].slice(0, 3)
                        : '';
                      return (
                        <button key={d.toDateString()} type="button"
                          className={[
                            'date-pill',
                            isSel ? 'selected' : '',
                            d.getDay() === 0 ? 'sunday' : '',
                          ].join(' ')}
                          aria-pressed={!!isSel}
                          aria-label={d.toLocaleDateString('en-US',
                            { weekday:'long', month:'long', day:'numeric' })}
                          onClick={() => pickDate(d)}
                        >
                          <span className="date-pill-dow">{DAYS[d.getDay()]}</span>
                          <span className="date-pill-num">{d.getDate()}</span>
                          <span className="date-pill-tag">{tag}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!selDate && (
                    <p className="strip-hint">
                      Swipe for more dates <span aria-hidden="true">→</span>
                    </p>
                  )}
                </div>
                ) : (
                <div className="cal-panel">
                  <div className="cal-nav">
                    <button className="cal-nav-btn" onClick={prevMonth} aria-label="Previous month">
                      <ChevronLeftIcon />
                    </button>
                    <span className="cal-month">
                      <strong>{MONTHS[viewMonth]}</strong> {viewYear}
                    </span>
                    <button className="cal-nav-btn" onClick={nextMonth} aria-label="Next month">
                      <ChevronRightIcon />
                    </button>
                  </div>
                  <div className="cal-grid">
                    {DAYS.map(d => <div key={d} className="cal-dow">{d}</div>)}
                    {cells.map((c, i) => {
                      const isToday = c.cur
                        && c.day === today.getDate()
                        && viewMonth === today.getMonth()
                        && viewYear === today.getFullYear();
                      const isSel = selDate && c.cur
                        && c.day === selDate.getDate()
                        && viewMonth === selDate.getMonth()
                        && viewYear === selDate.getFullYear();
                      const past = !c.cur || isPast(c.day);
                      return (
                        <button key={i}
                          className={[
                            'cal-day',
                            !c.cur  ? 'other'    : '',
                            past    ? 'past'     : '',
                            isSel   ? 'selected' : '',
                            isToday ? 'today'    : '',
                          ].join(' ')}
                          onClick={() => selectDate(c.day, c.cur)}
                          disabled={past}
                        >
                          {c.day}
                        </button>
                      );
                    })}
                  </div>
                </div>
                )}

                {/* Time slots */}
                {step === 'time' && selDate && (
                  <div className="time-panel">
                    <div className="time-header">
                      <span className="time-day">
                        {selDate.toLocaleDateString('en-US', { weekday:'short', day:'numeric' })}
                      </span>
                      <div className="fmt-toggle">
                        <button className={fmt === '12h' ? 'active' : ''} onClick={() => setFmt('12h')}>12h</button>
                        <button className={fmt === '24h' ? 'active' : ''} onClick={() => setFmt('24h')}>24h</button>
                      </div>
                    </div>
                    <div className="time-slots">
                      {slots.map(slot => (
                        <button key={slot}
                          className={`time-slot${selSlot === slot ? ' selected' : ''}`}
                          onClick={() => { setSelSlot(slot); setStep('details'); }}
                        >
                          {displaySlot(slot)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 'details' && (
            <div className="booking-card">
              <button className="back-btn" onClick={() => setStep('time')}>
                <ArrowLeftIcon /> Back
              </button>
              <div className="details-sub">
                <span className="details-chip">
                  <CalendarIcon />
                  {selDate?.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })}
                </span>
                <span className="details-dot" />
                <span className="details-chip">
                  <ClockIcon />
                  {displaySlot(selSlot)}
                </span>
              </div>
              {(errors.date || errors.time) && (
                <p className="form-error form-error-block" role="alert">
                  {errors.date || errors.time}
                  <button type="button" className="form-error-link"
                    onClick={() => setStep(errors.date ? 'calendar' : 'time')}>
                    Choose one
                  </button>
                </p>
              )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="appt-name">Full Name</label>
                    <input id="appt-name" name="name" placeholder="Your name"
                      value={formData.name} onChange={handleChange} required
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'appt-name-err' : undefined} />
                    {errors.name && (
                      <span className="form-error" id="appt-name-err" role="alert">{errors.name}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="appt-phone">Phone Number</label>
                    <input id="appt-phone" name="phone" type="tel" inputMode="tel"
                      placeholder="+91 00000 00000"
                      value={formData.phone} onChange={handleChange} required
                      autoComplete="tel"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'appt-phone-err' : undefined} />
                    {errors.phone && (
                      <span className="form-error" id="appt-phone-err" role="alert">{errors.phone}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Preferred Doctor</label>
                    <select name="doctor" value={formData.doctor} onChange={handleChange}>
                      <option value="">Select a doctor (optional)</option>
                      {team.map(d => <option key={d.name}>{d.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Service Needed</label>
                    <select name="service" value={formData.service} onChange={handleChange}>
                      <option value="">Select a service (optional)</option>
                      {services.map(s => <option key={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                  <div className="form-group full">
                    <label>Message</label>
                    <textarea name="message" rows={3} placeholder="Tell us about your concern..." value={formData.message} onChange={handleChange} />
                  </div>
                </div>
                <div className="confirm-review">
                  <div className="confirm-review-title">Ready to confirm?</div>
                  <dl className="confirm-review-grid">
                    <div className="confirm-review-row">
                      <dt>Date</dt>
                      <dd>{waDate(selDate) || '—'}</dd>
                    </div>
                    <div className="confirm-review-row">
                      <dt>Time</dt>
                      <dd>{waTime(selSlot, fmt) || '—'}</dd>
                    </div>
                    <div className="confirm-review-row">
                      <dt>Patient</dt>
                      <dd className={formData.name.trim() ? '' : 'is-pending'}>
                        {formData.name.trim() || 'Add your name above'}
                      </dd>
                    </div>
                  </dl>
                </div>
                <button type="submit" className="form-submit" disabled={sending}>
                  {sending ? 'Opening WhatsApp…' : <>Confirm Appointment <ArrowRightIcon /></>}
                </button>
                <p className="form-disclaimer">
                  Confirming opens WhatsApp with these details ready to send to Asta Dental Care,
                  so you can review the message before it leaves your phone.
                </p>
              </form>
            </div>
          )}

          {/* Step 4: Confirmed */}
          {step === 'confirmed' && (
            <div className="booking-card appt-success">
              <SuccessIcon className="success-icon" />
              <div className="success-title">Sent to WhatsApp!</div>
              <div className="success-sub">
                {selDate?.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })} at {displaySlot(selSlot)}
              </div>
              <div className="success-sub" style={{ marginTop: 8 }}>
                Send the message in WhatsApp and we'll call <strong>{formData.name}</strong> on{' '}
                <strong>{formData.phone}</strong> to confirm.
              </div>
              <button className="form-submit" style={{ marginTop: 24 }} onClick={reset}>
                Book Another Appointment
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}