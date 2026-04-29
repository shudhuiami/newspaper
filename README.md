# Khobor — Static Bangla Newspaper UI Prototype

Khobor is a static, dependency-free newspaper/news portal UI prototype focused on a modern Bangla-first reading experience with English language support.

The project intentionally uses only vanilla HTML, CSS, and JavaScript. There is no backend, database, build step, package manager, framework, or API integration.

## Project Goals

- Present a polished modern Bangla newspaper/news portal UI.
- Keep the prototype lightweight and easy to open locally.
- Preserve Bangla/English language switching.
- Keep content data-driven through `window.KHOBOR_DATA`.
- Demonstrate homepage, article, category, and search result UI states.
- Provide responsive layouts for desktop, tablet, and mobile.
- Include accessibility, keyboard UX, animation, and interaction polish.

## How to Preview

Open `index.html` directly in a browser.

Recommended options:

1. Double-click `index.html`.
2. Or use any simple static server, for example VS Code Live Server.

No install command is required.

## Preview Routes

The prototype includes hash-based static page previews:

| View | URL Hash |
| --- | --- |
| Homepage | `index.html` |
| Article page preview | `index.html#article` |
| Category page preview | `index.html#category` |
| Search results preview | `index.html#search` |

These are UI preview states only. They do not use real routing or backend data.

## Main Files

| File/Folder | Purpose |
| --- | --- |
| `index.html` | Static entry point and asset loading order |
| `data/base-data.js` | Base branding/config data |
| `data/dummy-data.js` | Bangla/English demo news content |
| `js/app.js` | Main data-driven homepage renderer |
| `js/header-enhancements.js` | Search overlay, sticky header, and mobile drawer behavior |
| `js/motion-effects.js` | Scroll reveal, motion polish, and back-to-top behavior |
| `js/accessibility-enhancements.js` | Semantic labels and accessibility helpers |
| `js/page-previews.js` | Article/category/search hash preview renderer |
| `styles/tokens.css` | Design tokens for color, typography, spacing, shadows, etc. |
| `styles/style.css` | Main layout and component styles |
| `styles/header-enhancements.css` | Header, overlay, and drawer styles |
| `styles/motion-effects.css` | Animation and scroll effect styles |
| `styles/responsive-polish.css` | Responsive breakpoint refinements |
| `styles/accessibility.css` | Focus states and accessibility styles |
| `styles/page-previews.css` | Article/category/search preview styles |

## Interaction Checklist

When reviewing the prototype, verify:

- Bangla/English language toggle works.
- Category nav active state updates.
- Search overlay opens and closes using button, backdrop, close button, and Escape key.
- Mobile drawer opens and closes using button, backdrop, close button, and Escape key.
- Scroll reveal animations run and content remains visible if JavaScript is disabled.
- Back-to-top button appears after scrolling.
- Hash preview pages load for `#article`, `#category`, and `#search`.
- Keyboard focus states are visible.
- Layout remains usable on desktop, tablet, and mobile widths.

## Development Rules

- Keep the project static.
- Do not add frameworks, bundlers, package managers, backend code, database code, or API calls.
- Keep UI data-driven from the existing data files.
- Keep accessibility and reduced-motion behavior intact when adding visual effects.
- Prefer isolated enhancement files for new interaction layers unless a main renderer change is necessary.

## Current Status

This prototype has completed the UI modernization pass:

- Design tokens and visual identity
- Modern homepage layout
- Reusable renderer helpers
- Premium header/search/mobile menu
- Advanced card and content section system
- Inline SVG icons
- Animations and scroll effects
- Responsive polish
- Accessibility and keyboard UX
- Article/category/search page previews
- Final QA documentation
