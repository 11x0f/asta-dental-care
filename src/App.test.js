/* Guards the on-page SEO structure that the JSON-LD in public/index.html
   depends on. These are cheap assertions about the rendered DOM, not about
   styling — they fail if someone removes the <h1>, reintroduces a heading
   level skip, or unmounts the FAQ answers again. */
import { render, screen } from '@testing-library/react';
import App from './App';
import { faqs } from './data';

const HEADING_TAGS = 'h1, h2, h3, h4, h5, h6';

test('renders exactly one h1 that names the business and the city', () => {
  const { container } = render(<App />);
  const h1s = container.querySelectorAll('h1');
  expect(h1s).toHaveLength(1);
  expect(h1s[0].textContent).toMatch(/Asta Dental Care/i);
  expect(h1s[0].textContent).toMatch(/Kannur/i);
});

test('heading hierarchy never skips a level', () => {
  const { container } = render(<App />);
  const levels = [...container.querySelectorAll(HEADING_TAGS)]
    .map(el => Number(el.tagName[1]));

  expect(levels[0]).toBe(1);
  levels.forEach((level, i) => {
    if (i === 0) return;
    const deepestSoFar = Math.max(...levels.slice(0, i));
    // Going deeper is only legal one step at a time.
    expect(level).toBeLessThanOrEqual(deepestSoFar + 1);
  });
});

test('FAQ answers stay in the DOM while collapsed, matching the FAQPage schema', () => {
  render(<App />);
  faqs.forEach(f => {
    expect(screen.getByText(f.a)).toBeInTheDocument();
  });
});

test('every image has an alt attribute', () => {
  const { container } = render(<App />);
  const imgs = [...container.querySelectorAll('img')];
  expect(imgs.length).toBeGreaterThan(0);
  imgs.forEach(img => {
    expect(img.hasAttribute('alt')).toBe(true);
  });
});

test('the clinic phone number and address are present as crawlable text', () => {
  const { container } = render(<App />);
  const text = container.textContent;
  expect(text).toMatch(/\+91 79070 71833/);
  expect(text).toMatch(/Grand Icon Building/);
  expect(text).toMatch(/Kannur, Kerala 670014/);
});

test('footer exposes crawlable internal links to every major section', () => {
  const { container } = render(<App />);
  const hrefs = [...container.querySelectorAll('footer a[href^="#"]')]
    .map(a => a.getAttribute('href'));
  ['#services', '#team', '#about', '#appointment', '#faq'].forEach(id => {
    expect(hrefs).toContain(id);
  });
});
