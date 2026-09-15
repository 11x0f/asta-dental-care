# Asta Dental Clinic

A marketing website for Asta Dental Care, built with React (Create React App) and GSAP animations. Single-page site with smooth-scroll navigation, a light/dark theme system driven by CSS custom properties, and centralized content data.

This README also doubles as a **template**: the "Documentation Conventions" section at the bottom explains the pattern used here so you can reproduce the same style of docs for a similar project.

## Tech Stack

- **React 19** (bootstrapped with `react-scripts` / Create React App)
- **GSAP** for scroll/entrance animations
- **Plain CSS** with custom properties (no CSS-in-JS, no Tailwind) — theming via `[data-theme]` attribute
- **Testing Library** + Jest (CRA default test setup)

## Getting Started

### Prerequisites
- Node.js (LTS) and npm

### Install
```bash
npm install
```

### Run locally
```bash
npm start
```
Opens the app at [http://localhost:3000](http://localhost:3000) with hot reload.

### Run tests
```bash
npm test
```

### Build for production
```bash
npm run build
```
Outputs an optimized static build to `build/`.

## Project Structure

```
src/
  App.js               # Composes all page sections in order
  index.js              # React DOM entry point
  index.css             # Base/global resets
  styles/
    global.css          # Theme tokens (CSS custom properties), imported once in App.js
  data/
    index.js             # All site content: services, team, testimonials, locations, FAQs, etc.
  components/
    <Section>.jsx        # One component per page section
    <Section>.css         # Its co-located stylesheet
public/
  Team/                  # Static team headshots referenced by src/data/index.js
```

### Conventions
- **One section = one component.** Each visible page section (Hero, Services, Team, About, WhyUs, Testimonials, Locations, Appointment, FAQ, Footer, Navbar) is its own `.jsx` + `.css` pair in `src/components/`, imported and stacked in order inside [App.js](src/App.js).
- **Content lives in data, not markup.** Copy, images, and structured lists (services, team bios, testimonials, locations) live in [src/data/index.js](src/data/index.js) as plain exported arrays/objects, so content edits never touch component logic.
- **Static assets referenced by path.** Images referenced from `src/data/index.js` (e.g. team photos) live under `public/` and are referenced by absolute path (e.g. `/Team/name.png`), not imported as modules.

## Theming System

Theming is done entirely with CSS custom properties, no JS re-render of styles required.

- All design tokens (backgrounds, accent colors, text colors, borders, shadows, nav colors) are defined twice in [src/styles/global.css](src/styles/global.css): once under `[data-theme="dark"]` and once under `:root, [data-theme="light"]` (light is the default).
- [Navbar.jsx](src/components/Navbar.jsx) toggles theme by setting `data-theme="dark"` / `data-theme="light"` on `document.documentElement`; every component's CSS then picks up the new values automatically via the cascade.
- To add a new token: add the variable to **both** theme blocks in `global.css`, then reference it as `var(--your-token)` in any component CSS file.

## Adding a New Section

1. Add a data entry (if needed) to `src/data/index.js`.
2. Create `src/components/NewSection.jsx` and `src/components/NewSection.css`.
3. Style using existing `var(--...)` tokens from `global.css` rather than hard-coded colors, so it respects both themes.
4. Import and place `<NewSection />` in [App.js](src/App.js) in the desired scroll order.
5. If it should appear in the nav, add `{ label: '...', id: '...' }` to the `links` array in [Navbar.jsx](src/components/Navbar.jsx) and give the section that `id`.

## Deployment

This is a standard CRA app — `npm run build` produces a static `build/` folder deployable to any static host (Netlify, Vercel, GitHub Pages, S3, etc.). No server-side rendering or backend is required.

---

## Documentation Conventions (how to replicate this README for a similar project)

This structure works well for small marketing/brochure sites (React or otherwise) and is meant to be copied:

1. **One-paragraph overview** — what the site is and the core stack, in plain language, up top.
2. **Tech Stack** — a short bullet list, no explanations needed for well-known tools.
3. **Getting Started** — copy-pasteable commands only: install, run, test, build. No prose between commands.
4. **Project Structure** — a real directory tree (trimmed to what matters) plus a short "Conventions" list explaining *why* the code is organized that way (e.g. "content lives in data, not markup") — this is the part that actually saves future contributors time, more than the tree itself.
5. **A system-specific section** — whatever makes this project non-obvious (here: the theming system). Document the mechanism and the one file to edit, not every detail.
6. **"Adding a new X" walkthrough** — a numbered checklist for the single most common change someone will make (here: adding a page section). This turns tribal knowledge into a repeatable recipe.
7. **Deployment** — one or two sentences, only if it isn't obvious from the stack.

Keep each section short enough to scan in a few seconds; link to source files (e.g. `[App.js](src/App.js)`) instead of re-explaining what the code already says.
