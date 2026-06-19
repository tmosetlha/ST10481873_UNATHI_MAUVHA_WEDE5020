# CHANGELOG
## GreenRoots NPO Website — WEDE5020
**Author:** Unathi Mauvha | ST10481873
**Module:** WEDE5020 — Web Development
**Institution:** The Independent Institute of Education (IIE)

---

## Part 3 — Enhancing Functionality and SEO
**Date:** June 2026
**Author:** Unathi Mauvha | ST10481873

### SEO Optimisation (All Pages)
* Added full `<meta name="description">` tags with unique, keyword-rich descriptions per page
* Added `<meta name="keywords">` tags with targeted search terms per page
* Added `<meta name="robots" content="index, follow">` on all pages
* Added `<meta name="theme-color" content="#2d6a4f">` for mobile browser theming
* Added Open Graph meta tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) on all pages for social media sharing
* Added `<link rel="canonical">` on all pages pointing to Netlify deployment URL
* Added `<link rel="preconnect">` for Google Fonts on all pages for faster font loading
* Improved all image `alt` text across all 5 pages to be descriptive and SEO-optimised
* Added `scope="col"` attributes to all table header cells in `services.html` for accessibility

### JavaScript — `js/main.js` (New Full Implementation)
* Implemented hamburger menu toggle — clicking the button adds/removes `.open` class on `#main-nav`; `aria-expanded` attribute updates dynamically for accessibility
* Implemented auto-close nav on outside click for mobile UX
* Implemented scroll-triggered count-up animation on all `.count-up` stat elements on `index.html` using `IntersectionObserver`
* Implemented scroll-reveal animations — elements with `.reveal` class animate in when entering the viewport
* Implemented sticky header shadow enhancement — shadow intensifies on scroll

### Form Validation — `enquiry.html`
* Implemented full client-side JavaScript validation on `#enquiry-form`
* Validates Full Name: required, minimum 2 characters
* Validates Email Address: required, valid email format using regex
* Validates Phone Number: required, South African format (10–15 digits, allows `+`, `-`, spaces)
* Validates Enquiry Type dropdown: required, must select an option
* Validates "How did you hear about us" radio group: at least one option must be selected
* Validates Message textarea: required, minimum 20 characters
* Validates POPIA consent checkbox: must be checked before submission
* Inline error messages written into `<span class="field-error">` elements below each invalid field
* Error messages cleared in real-time as user corrects each field
* On successful validation, `#enquiry-success` success message displayed and form hidden
* Implemented live character counter on message textarea (`#message-count`) updating on every keystroke

### Form Validation + Email — `contact.html`
* Implemented full client-side JavaScript validation on `#contact-form`
* Validates Full Name: required, minimum 2 characters
* Validates Email Address: required, valid email format
* Validates Subject: required, minimum 3 characters
* Validates Message Type dropdown: required, must select an option
* Validates Message textarea: required, minimum 20 characters
* Inline error messages written into `<span class="field-error">` elements below each invalid field
* On successful validation, form data compiled into a `mailto:` link addressed to `info@greenrootsnpo.org.za`
* `mailto:` link includes pre-filled subject and body with all form fields for easy sending
* On submission, `#contact-success` success message displayed confirming email was prepared
* Implemented live character counter on message textarea (`#contact-message-count`)

### Additional HTML Updates
* Added `<button class="hamburger" id="hamburger">` with `aria-label` and `aria-expanded` to header on all 5 pages
* Added `id="main-nav"` to `<nav>` element on all 5 pages for JS hamburger targeting
* Added `aria-labelledby` attributes to all major `<section>` elements across all 5 pages
* Added `aria-current="page"` to active navigation link on each respective page
* Added `autocomplete` attributes to all form input fields for browser autofill support
* Added `.optional` span labels to non-required form fields for clarity
* Added `role="group"` and `role="radiogroup"` to checkbox and radio groups in `enquiry.html`
* Wrapped enquiry and contact form submit/reset buttons in `.form-buttons` div for consistent CSS layout
* Added `role="alert"` to all `<span class="field-error">` and success message divs for screen reader support
* Added `href="tel:"` links to all phone numbers in `contact.html` for click-to-call on mobile
* Added `href="mailto:"` links to all email addresses in `contact.html`
* Added Message Type `<select>` dropdown to `contact.html` form as additional field

### CSS Updates — `css/style.css`
* Added `.form-success` styles — green success banner shown after valid form submission
* Added `.field-error` styles — red inline error message shown below invalid fields
* Added `.char-count` styles — subtle grey character counter below textareas
* Added `.optional` styles — lighter grey label for optional form fields
* Added `.form-buttons` styles — flex row layout for submit and reset buttons
* Added `.reveal` animation class — fade-in + slide-up on scroll using CSS `@keyframes`
* Added `.count-up` transition styles for stat number animations
* Added `contact-card a` styles — clickable phone/email links styled in green

### SEO Files Added
* Created `sitemap.xml` — lists all 5 pages with `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>` tags
* Created `robots.txt` — allows all crawlers, references sitemap URL

### GitHub Repository
* All Part 3 files committed with descriptive commit messages
* README.md updated with Part 3 changelog entries and new references
* Website deployed to Netlify at `https://greenrootsnpo.netlify.app`

---

## Part 2 — Designing the Visuals
**Date:** May 2026
**Author:** Unathi Mauvha | ST10481873

### css/style.css — Full Part 2 Styling
* Added Google Fonts import (Poppins + Merriweather) for professional typography
* Introduced CSS custom properties (variables) for colours, spacing, fonts, and shadows
* Applied full typography scale using `rem` units across all heading levels (h1–h4)
* Styled header with sticky positioning, box shadow, and smooth nav hover transitions
* Enhanced hero section with backdrop blur, gradient overlay, and text shadow
* Added hover lift effects (`translateY`) on cards, team cards, news cards, and location cards
* Applied gradient backgrounds to page banners, impact stats section, and CTA banner
* Styled forms with focus ring effects, accent-colour checkboxes, and fieldset shadows
* Styled tables with striped rows, hover highlight, and rounded corners
* Added decorative green underline to all section `h2` headings
* Implemented full responsive design across three breakpoints:
  * Desktop: default layout (1200px+)
  * Tablet: adjusted padding and font sizes (max-width: 1024px)
  * Mobile: stacked layouts, wrapping nav, single-column cards (max-width: 768px)
  * Small mobile: full-width buttons, reduced hero height (max-width: 480px)

### index.html
* Added `srcset` and `sizes` attributes to hero image for responsive loading
* Added `srcset` and `sizes` to all mission snapshot card images
* Added `srcset` and `sizes` to all news card images
* Wrapped news card text content in `.news-card-body` div for correct CSS padding
* Added `loading="lazy"` on all non-hero images
* Added `loading="eager"` on hero image for fast initial load

### about.html
* Added `srcset` and `sizes` to history two-column image
* Added `srcset` and `sizes` to all four team member images
* Added `loading="lazy"` on all images

### services.html
* Added `srcset` and `sizes` to all four programme section images
* Added `loading="lazy"` on all images

### enquiry.html
* Added `srcset` and `sizes` to all three involvement card images
* Added `loading="lazy"` on all images

### contact.html
* Added `srcset` and `sizes` to logo image
* All Google Maps iframes retain `loading="lazy"` for performance

---

## Part 1 — Building the Foundation
**Date:** February 2026
**Author:** Unathi Mauvha | ST10481873

* Created full file and folder structure (`html`, `css`, `js`, `images`)
* Built 5 HTML pages: `index.html`, `about.html`, `services.html`, `enquiry.html`, `contact.html`
* Implemented navigation linking across all pages
* Added basic CSS reset and foundation styles in `css/style.css`
* Embedded Google Maps on `contact.html` (4 locations: Braamfontein, Soweto, Alexandra, Sandton)
* Built enquiry form with fieldsets, validation attributes, and POPIA consent checkbox
* Added impact statistics section, news grid, and CTA banner on homepage
* Set up private GitHub repository and initial commit
* Created `README.md` with project overview, sitemap, and Part 1 references

---

*© 2026 GreenRoots NPO | WEDE5020 | IIE Rosebank College*
