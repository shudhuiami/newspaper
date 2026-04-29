# AI Agent Instructions — Khobor Newspaper UI Prototype

## Project Purpose
This repository is a static Bangla-first newspaper/news portal UI prototype. The main goal is to modernize and elevate the UI/UX while keeping the project lightweight, static, and easy to preview by opening `index.html`.

## Current Architecture
- `index.html` is the static entry point.
- `styles/tokens.css` contains design tokens.
- `styles/style.css` contains the main UI styles.
- `assets/fonts/fonts.css` contains self-hosted font declarations.
- `data/base-data.js` contains base Bangla/English content.
- `data/dummy-data.js` overrides content for dummy preview mode.
- `js/app.js` renders the UI using vanilla JavaScript and `window.KHOBOR_DATA`.

## Non-Negotiable Rules
1. Keep the project static and runnable by opening `index.html`.
2. Do not add backend, database, API integration, build tools, bundlers, frameworks, or package managers unless explicitly requested.
3. Preserve the Bangla/English language toggle.
4. Preserve the data-driven rendering approach using `window.KHOBOR_DATA`.
5. Keep the UI Bangla-first while making English mode polished as well.
6. Escape all dynamic text before injecting it into HTML.
7. Use semantic HTML where possible: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`.
8. Keep the code readable, well-commented, and easy for a developer to continue.
9. Avoid unnecessary external dependencies.
10. Use lightweight vanilla JS interactions only.

## UI/UX Direction
The design should feel like a premium modern Bangladeshi newspaper portal: editorial, trustworthy, fast, responsive, and visually polished. Avoid making it look like a generic blog or a flashy tabloid.

## Visual Design Requirements
- Keep maroon as the primary editorial brand color.
- Use refined ink, cream, soft gray, and accent colors.
- Improve spacing, visual hierarchy, section rhythm, and card density.
- Add modern cards, badges, dividers, hover states, and subtle shadows.
- Improve Bangla typography readability and line-height.
- Treat mobile UX as a first-class experience.

## Component Expectations
Prefer reusable rendering helpers in `js/app.js`, such as:
- `renderIcon()`
- `renderSectionHeader()`
- `renderCategoryBadge()`
- `renderAuthorMeta()`
- `renderNewsCard()`
- `renderFeatureCard()`
- `renderCompactCard()`
- `renderHorizontalCard()`
- `renderTrendingList()`
- `renderAdSlot()`
- `renderVideoCard()`
- `renderNewsletterBox()`
- `renderSearchOverlay()`
- `renderMobileMenu()`
- `renderBackToTopButton()`

## Interaction Requirements
Add lightweight interactions only:
- Sticky header transition on scroll.
- Search overlay open/close.
- Mobile drawer open/close.
- Back-to-top button.
- Scroll reveal using `IntersectionObserver`.
- Card hover lift and image zoom.
- Breaking ticker pause on hover.
- Escape key closes overlays.
- Respect `prefers-reduced-motion`.

## Responsive Requirements
Support these layout breakpoints:
- Desktop: large editorial grid with sidebar.
- 1200px: reduce wide spacing.
- 991px: tablet layout.
- 768px: mobile/tablet transition.
- 575px: compact mobile layout.

Ensure there is no horizontal overflow, broken card grid, unreadable Bangla headline, or cramped tap target.

## Accessibility Requirements
- Use accessible buttons instead of clickable divs.
- Add `aria-label` to icon-only buttons.
- Add visible focus states.
- Keep overlays keyboard-friendly.
- Make language toggle, search, mobile menu, and back-to-top keyboard usable.
- Avoid hiding important content from assistive technology incorrectly.

## Code Quality Requirements
- Keep functions small and focused.
- Add comments for major render sections and interaction handlers.
- Avoid over-commenting obvious lines.
- Do not duplicate large HTML blocks if a reusable helper can solve it.
- Do not introduce global state beyond what is necessary.
- Check the browser console after changes.

## Definition of Done
A task is done when:
- `index.html` loads without build tools.
- Bangla and English modes both work.
- UI is clean on desktop, tablet, and mobile.
- There are no console errors.
- The implementation remains static and lightweight.
- Code is readable and documented enough for future work.
