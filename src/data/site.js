/* ── Single source of truth for NAP (Name, Address, Phone) ──
   Search engines, the footer, and the JSON-LD in public/index.html must all
   agree on these values. Local ranking depends on this data matching the
   Google Business Profile exactly, so change it here and nowhere else.

   NOTE: public/index.html carries a hand-written copy of this data inside its
   JSON-LD block. It cannot import from here (it is a static template, not part
   of the bundle) — if you edit anything below, mirror it there and in
   public/sitemap.xml. */

export const SITE_URL = 'https://astadentalcare.in';

export const business = {
  name: 'Asta Dental Care',
  legalName: 'Asta Dental Care',
  description:
    "Multi-specialty dental clinic in Chalad, Kannur offering laser dentistry, " +
    "implants, root canals, Invisalign, braces and paediatric dental care.",
  // Voice line — the number on the Google Business Profile.
  phone: '+917907071833',
  phoneDisplay: '+91 79070 71833',
  // WhatsApp-only line used by the appointment handoff. Deliberately different
  // from `phone`; do not publish it as the clinic's primary contact number.
  whatsapp: '919400772354',
  whatsappDisplay: '+91 94007 72354',
  email: 'astadentalcare24@gmail.com',
  instagram: 'https://www.instagram.com/asta_dental_care/',
  founded: '2024',
};

export const address = {
  street: 'Grand Icon Building, near Mappila LP School, Chalad',
  locality: 'Kannur',
  region: 'Kerala',
  postalCode: '670014',
  country: 'IN',
  full: 'Asta Dental Care, Grand Icon Building, near Mappila LP School, Chalad, Kannur, Kerala 670014',
};

export const geo = { lat: 11.8814719, lng: 75.354188 };

export const mapUrl =
  'https://www.google.com/maps/place/Asta+Dental+Care+Kannur/@11.8814719,75.3516131,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba43ba06dac828d:0xbbe10353809b1dbd!8m2!3d11.8814719!4d75.354188!16s%2Fg%2F11w92d9126';

/* Mirrors the slot generator in Appointment.jsx (WORK_HOURS / SUN_HOURS). */
export const openingHours = [
  { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:30', closes: '18:30' },
  { days: ['Sunday'], opens: '09:30', closes: '14:00' },
];

export const areaServed = [
  'Kannur', 'Chalad', 'Thalassery', 'Kannur Town', 'Payyanur', 'Taliparamba', 'Mattannur',
];
