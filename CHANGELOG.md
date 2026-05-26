## Changelog

---

### Part 2 — Designing the Visuals
**Date:** May 2026
**Author:** [UNATHI MAUVHA] | ST[10481873]

#### Changes Made:

**css/style.css — Full Part 2 Styling**
- Added Google Fonts import (Poppins + Merriweather) for professional typography
- Introduced CSS custom properties (variables) for colours, spacing, fonts, and shadows
- Applied full typography scale using `rem` units across all heading levels (h1–h4)
- Styled header with sticky positioning, box shadow, and smooth nav hover transitions
- Enhanced hero section with backdrop blur, gradient overlay, and text shadow
- Added hover lift effects (`translateY`) on cards, team cards, news cards, and location cards
- Applied gradient backgrounds to page banners, impact stats section, and CTA banner
- Styled forms with focus ring effects, accent-colour checkboxes, and fieldset shadows
- Styled tables with striped rows, hover highlight, and rounded corners
- Added decorative green underline to all section `h2` headings
- Implemented full responsive design across three breakpoints:
  - Desktop: default layout (1200px+)
  - Tablet: adjusted padding and font sizes (max-width: 1024px)
  - Mobile: stacked layouts, wrapping nav, single-column cards (max-width: 768px)
  - Small mobile: full-width buttons, reduced hero height (max-width: 480px)

**index.html**
- Added `srcset` and `sizes` attributes to hero image for responsive loading
- Added `srcset` and `sizes` to all mission snapshot card images
- Added `srcset` and `sizes` to all news card images
- Wrapped news card text content in `.news-card-body` div for correct CSS padding
- Added `loading="lazy"` on all non-hero images
- Added `loading="eager"` on hero image for fast initial load

**about.html**
- Added `srcset` and `sizes` to history two-column image
- Added `srcset` and `sizes` to all four team member images
- Added `loading="lazy"` on all images

**services.html**
- Added `srcset` and `sizes` to all four programme section images
- Added `loading="lazy"` on all images

**enquiry.html**
- Added `srcset` and `sizes` to all three involvement cards images
- Added `loading="lazy"` on all images

**contact.html**
- Added `srcset` and `sizes` to logo image
- All Google Maps iframes retain `loading="lazy"` for performance

---

### Part 1 — Building the Foundation
**Date:** February 2026
**Author:** [UNATHI MAUVHA] | ST[10481873]

- Created full file and folder structure (html, css, js, images)
- Built 5 HTML pages: index, about, services, enquiry, contact
- Implemented navigation linking across all pages
- Added basic CSS reset and foundation styles
- Embedded Google Maps on contact page (4 locations)
- Built enquiry form with fieldsets, validation attributes, and POPIA consent
- Added impact statistics, news grid, and CTA banner on homepage
