import React from 'react';

const Icon = ({ children, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

export const ClockIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9.25" />
    <path d="M12 6.75V12l3.5 2" />
  </Icon>
);

export const CalendarIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M3 10h18M8 3v4M16 3v4" />
    <circle cx="12" cy="15.5" r="1.15" fill="currentColor" stroke="none" />
  </Icon>
);

export const PhoneIcon = (p) => (
  <Icon {...p}>
    <path d="M21 16.9v2.6a2 2 0 0 1-2.2 2 19.5 19.5 0 0 1-8.5-3 19.2 19.2 0 0 1-5.9-5.9 19.5 19.5 0 0 1-3-8.6A2 2 0 0 1 3.4 2H6a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L7.1 9.85a15.8 15.8 0 0 0 6 6l1.25-1.15a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 21 16.9Z" />
  </Icon>
);

export const CheckIcon = (p) => (
  <Icon {...p}>
    <path d="M21.4 10.4A9.5 9.5 0 1 1 16.9 3.4" />
    <path d="m8.4 11.6 3.4 3.4L22 5" />
  </Icon>
);

export const ChevronLeftIcon = (p) => (
  <Icon {...p}><path d="m14.5 5.5-6 6.5 6 6.5" /></Icon>
);

export const ChevronRightIcon = (p) => (
  <Icon {...p}><path d="m9.5 5.5 6 6.5-6 6.5" /></Icon>
);

export const ArrowLeftIcon = (p) => (
  <Icon {...p}><path d="M19 12H5m0 0 6-6m-6 6 6 6" /></Icon>
);

export const ArrowRightIcon = (p) => (
  <Icon {...p}><path d="M5 12h14m0 0-6-6m6 6-6 6" /></Icon>
);

export const SuccessIcon = (p) => (
  <svg viewBox="0 0 52 52" fill="none" aria-hidden="true" {...p}>
    <circle className="success-ring" cx="26" cy="26" r="23" stroke="currentColor" strokeWidth="2" />
    <path
      className="success-check"
      d="M15.5 26.5 22.5 33.5 36.5 19"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const apptIconMap = {
  clock: ClockIcon,
  calendar: CalendarIcon,
  phone: PhoneIcon,
  check: CheckIcon
};
