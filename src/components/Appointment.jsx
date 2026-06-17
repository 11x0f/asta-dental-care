import React, { useState } from 'react';
import { services, locations } from '../data';
import './Appointment.css';

const SLOT_DURATION = 30;
const WORK_HOURS = { start: 9.5, end: 21 };
const SUN_HOURS  = { start: 10,  end: 19 };

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

const apptFeatures = [
  { icon: '🕐', text: 'Mon – Sat: 9:30 AM – 9:00 PM' },
  { icon: '📅', text: 'Sunday: 10:00 AM – 7:00 PM' },
  { icon: '📞', text: '+91 87146 08881' },
  { icon: '✅', text: 'Free consultation & X-rays' },
];

export default function Appointment() {
  const today = new Date();
  const [step, setStep]           = useState('calendar');
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selDate, setSelDate]     = useState(null);
  const [selSlot, setSelSlot]     = useState(null);
  const [fmt, setFmt]             = useState('12h');
  const [formData, setFormData]   = useState({ name:'', phone:'', email:'', location:'', service:'', message:'' });

  const cells = calendarDays(viewYear, viewMonth);

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

  const selectDate = (day, cur) => {
    if (!cur || isPast(day)) return;
    setSelDate(new Date(viewYear, viewMonth, day));
    setSelSlot(null);
    setStep('time');
  };

  const to24 = (slot) => {
    const [time, ampm] = [slot.slice(0, -2), slot.slice(-2)];
    let [h, m] = time.split(':').map(Number);
    if (ampm === 'pm' && h !== 12) h += 12;
    if (ampm === 'am' && h === 12) h = 0;
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
  };
  const displaySlot = s => fmt === '24h' ? to24(s) : s;
  const slots = selDate ? generateSlots(selDate) : [];

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); setStep('confirmed'); };
  const reset = () => {
    setStep('calendar'); setSelDate(null); setSelSlot(null);
    setFormData({ name:'', phone:'', email:'', location:'', service:'', message:'' });
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
          <div className="appt-features">
            {apptFeatures.map(f => (
              <div key={f.text} className="appt-feature">
                <div className="appt-feature-icon">{f.icon}</div>
                {f.text}
              </div>
            ))}
          </div>
          {selDate && (
            <div className="appt-selection">
              <div className="appt-sel-row">
                📅 {selDate.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })}
              </div>
              {selSlot && <div className="appt-sel-row">🕐 {displaySlot(selSlot)}</div>}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="appt-form">

          {/* Steps 1 & 2: Calendar + Time */}
          {(step === 'calendar' || step === 'time') && (
            <div className="booking-card">
              <div className="cal-time-wrapper">

                {/* Calendar */}
                <div className="cal-panel">
                  <div className="cal-nav">
                    <button className="cal-nav-btn" onClick={prevMonth}>‹</button>
                    <span className="cal-month">
                      <strong>{MONTHS[viewMonth]}</strong> {viewYear}
                    </span>
                    <button className="cal-nav-btn" onClick={nextMonth}>›</button>
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
              <button className="back-btn" onClick={() => setStep('time')}>← Back</button>
              <p className="details-sub">
                📅 {selDate?.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })}
                &nbsp;·&nbsp; 🕐 {displaySlot(selSlot)}
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input name="phone" placeholder="+91 00000 00000" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <select name="location" value={formData.location} onChange={handleChange} required>
                      <option value="">Select clinic</option>
                      {locations.map(l => <option key={l.name}>{l.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group full">
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
                <button type="submit" className="form-submit">Confirm Appointment →</button>
                <p className="form-disclaimer">By submitting, you agree to be contacted by Elite Dental Studio via phone or WhatsApp.</p>
              </form>
            </div>
          )}

          {/* Step 4: Confirmed */}
          {step === 'confirmed' && (
            <div className="booking-card appt-success">
              <div className="success-icon">✅</div>
              <div className="success-title">Appointment Requested!</div>
              <div className="success-sub">
                {selDate?.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })} at {displaySlot(selSlot)}
              </div>
              <div className="success-sub" style={{ marginTop: 8 }}>
                We'll call <strong>{formData.name}</strong> on <strong>{formData.phone}</strong> to confirm.
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