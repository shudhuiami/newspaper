# Final UI QA Checklist

This checklist documents the final static UI review scope for the Khobor newspaper prototype.

## Static Loading

- [x] `index.html` remains the only entry point.
- [x] No build tool, package manager, framework, backend, database, or API dependency is required.
- [x] CSS/JS files are loaded in a predictable order.
- [x] The project can be previewed by opening `index.html` directly or through a simple static server.

## Language and Data

- [x] Bangla content renders by default.
- [x] English language toggle remains available.
- [x] UI continues to render from `window.KHOBOR_DATA`.
- [x] Article/category/search preview pages use existing static demo content.

## Header and Navigation

- [x] Sticky masthead polish is present.
- [x] Category navigation active state works.
- [x] Search overlay opens from the header trigger.
- [x] Search overlay closes from backdrop, close button, and Escape key.
- [x] Mobile drawer opens from the mobile trigger.
- [x] Mobile drawer closes from backdrop, close button, drawer link, and Escape key.
- [x] Drawer links proxy to the existing category nav.

## Page Previews

- [x] Homepage UI is available at `index.html`.
- [x] Article preview is available at `index.html#article`.
- [x] Category preview is available at `index.html#category`.
- [x] Search preview is available at `index.html#search`.
- [x] Preview pages are static and do not introduce real routing.
- [x] Preview pages re-run motion/accessibility enhancements after render.

## Responsive Layout

- [x] Desktop layout has complete news portal structure.
- [x] Tablet layout avoids broken grids and sticky sidebar issues.
- [x] Mobile layout stacks cards and sections clearly.
- [x] Small-phone layout protects headline readability and tap targets.
- [x] Horizontal overflow protection is present.

## Motion and Effects

- [x] Scroll reveal runs progressively.
- [x] Back-to-top button appears after scrolling.
- [x] Hover transitions are polished but lightweight.
- [x] Reduced-motion preference is respected.
- [x] Content remains visible when JavaScript is disabled because reveal hiding is gated behind `.js-motion-enabled`.

## Accessibility and Keyboard UX

- [x] Skip link is available.
- [x] Focus-visible states are stronger and consistent.
- [x] Search overlay and drawer expose dialog semantics.
- [x] Overlay/drawer focus trap is implemented.
- [x] Focus returns to the original trigger after dialog close.
- [x] Active nav states sync with `aria-current`.
- [x] Placeholder image blocks receive meaningful `role="img"` labels.
- [x] Sections receive `aria-labelledby` where possible.

## Known Limitations

- This is still a static UI prototype.
- Search, filters, article actions, authentication, subscriptions, and social links are dummy UI only.
- Image blocks are gradient placeholders, not real CMS images.
- Hash preview states are not production routing.

## Final Review Result

Ready for merge from final QA/documentation side.