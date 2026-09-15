import React from 'react';

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

const toothPath =
  'M12 4c-1.8 0-2.5.9-3.6.9C7.3 4.9 6.4 4.3 5.6 4.8c-1.1.7-1.2 2.7-.8 4.5.4 2 1.4 4 2 5.7.4 1.1.9 2.1 1.6 2.1.7 0 .8-1.3 1.1-2.5.2-1.1.5-2.1 1.1-2.1s.9 1 1.1 2.1c.3 1.2.4 2.5 1.1 2.5.7 0 1.2-1 1.6-2.1.6-1.7 1.6-3.7 2-5.7.4-1.8.3-3.8-.8-4.5-.8-.5-1.7.1-3.1.1C14.5 4.9 13.8 4 12 4Z';

export const ToothPlusIcon = () => (
  <svg {...base}>
    <path d={toothPath} />
    <circle cx="18.5" cy="6.5" r="3" fill="currentColor" stroke="none" opacity="0.15" />
    <path d="M18.5 5v3M17 6.5h3" />
  </svg>
);

export const ToothHeartIcon = () => (
  <svg {...base}>
    <path d="M12 19.5s-6.2-3.9-6.2-8.5c0-2.3 1.8-4 4-4 1 0 1.8.4 2.2 1.1.4-.7 1.2-1.1 2.2-1.1 2.2 0 4 1.7 4 4 0 4.6-6.2 8.5-6.2 8.5Z" />
  </svg>
);

export const ToothScanIcon = () => (
  <svg {...base}>
    <path d={toothPath} transform="scale(0.72) translate(4.5 4.5)" />
    <path d="M4 8V6.5A1.5 1.5 0 0 1 5.5 5H7" />
    <path d="M17 5h1.5A1.5 1.5 0 0 1 20 6.5V8" />
    <path d="M20 16v1.5a1.5 1.5 0 0 1-1.5 1.5H17" />
    <path d="M7 19H5.5A1.5 1.5 0 0 1 4 17.5V16" />
  </svg>
);

export const ToothLeafIcon = () => (
  <svg {...base}>
    <path d={toothPath} transform="scale(0.82) translate(2.4 2)" />
    <path d="M15 15.5c2.5-.3 4.3-2.2 4.3-5-2.8 0-4.8 1.7-5.3 4.2" />
  </svg>
);

export const whyIconMap = {
  plus: ToothPlusIcon,
  heart: ToothHeartIcon,
  scan: ToothScanIcon,
  leaf: ToothLeafIcon
};
