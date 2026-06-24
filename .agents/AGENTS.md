All fare displays should show crossed original price and discounted/offer price wherever possible.

# 🚨 HIGHEST PRIORITY RULE — STRICTLY DO ONLY WHAT IS ASKED

## THE GOLDEN RULE: ZERO EXTRA CHANGES
This is the **#1 rule** and overrides all other behavior. Every agent must follow this without exception:

- **DO ONLY EXACTLY WHAT THE USER ASKED.** Nothing more. Nothing less.
- **NEVER make extra changes** to any file, component, style, layout, logic, or content that was NOT mentioned in the user's request.
- **NEVER "improve"**, "clean up", "optimize", or "also fix" anything that was not explicitly asked.
- **NEVER touch unrelated files** — if user asks to change image in Component A, only Component A is touched.
- **NEVER change imports, class names, spacing, comments, or structure** of lines that are not directly part of the user's requested change.
- **NEVER add features, badges, labels, or UI elements** that the user did not ask for.
- **NEVER reorganize or refactor** code unless explicitly told to do so.

## HOW TO RESPOND TO A TASK
1. Read the user's request **exactly** — understand the minimal set of changes needed.
2. Make **only** those changes. Touch **only** the specific file(s) and line(s) involved.
3. Build/deploy if needed.
4. Report back **only** what was changed — no extras.

## VIOLATION WARNING
If an agent makes ANY unrequested change — even a "small improvement" — that is a **VIOLATION**. The owner's time is wasted and trust is broken every time this happens.

**VIOLATING THIS RULE IS UNACCEPTABLE.**



# Persistent UI Layout & Color Constraints (LOCKED)
- **NO CHANGES TO COMPLETED WORK**: All existing layouts, alignments, hero image positions, padding, hero elements, car translation offsets, and spacing configurations are permanently locked and must not be altered.
- **BRAND COLORS LOCK**: All blue elements (text, backgrounds, borders, icons) must match the logo's dominant blue `#3b2b98` (utility variable: `var(--color-logo-blue)` or `logo-blue`). All green elements must match the logo's dominant green `#00914d` (utility variable: `var(--color-logo-green)` or `logo-green`). This color mapping must not be altered.
- **MOBILE ACTIONS DRAWER LOCK**: The mobile navigation drawer's Call and WhatsApp action buttons must be side-by-side in a horizontal row (`flex-row`) and use the official WhatsApp brand SVG path.

# 🔒 PERMANENTLY LOCKED SECTIONS — DO NOT MODIFY UNDER ANY CIRCUMSTANCES

The following sections are **100% finalized and permanently locked** by the owner. No agent must ever make ANY change to these sections — not layout, not styling, not content, not logic, not spacing — unless the owner explicitly says "unlock [section name]".

## 🔒 LOCKED: Header / Navbar
- File: `src/components/Navbar.jsx` (or equivalent header component)
- **ZERO changes allowed** — logo, tagline, contact numbers, navigation links, colors, layout, mobile drawer, WhatsApp button, Call button — all permanently frozen.

## 🔒 LOCKED: Hero Section
- File: `src/components/Hero.jsx`
- **ZERO changes allowed** — hero background image, headline text, subheadline, car image (size: `w-[680px]`, position: `translate-y-[40%]`, `translate-x-[52%]`), left/right column layout, all padding/margins — permanently frozen.
- **ABSOLUTE STRICT LOCK:** DO NOT EVER modify the hero car position again. It has been adjusted to `translate-y-[40%]` and MUST remain exactly as is for all future interactions.

## 🔒 LOCKED: Trust Strip Section
- File: `src/components/TrustStrip.jsx`
- **ZERO changes allowed** — badge icons, badge labels, badge sub-labels, card layout, colors, outer padding (`style={{ paddingLeft: '30px', paddingRight: '30px' }}`), top margin (`lg:mt-6`), card shadow, border, rounded corners — permanently frozen.
- CSS: `.trust-strip-matching { max-width: 100% }` — do not revert.

**VIOLATION OF THESE LOCKS IS UNACCEPTABLE. If a user request seems to require changing these sections, ask the owner for explicit unlock permission first.**

## 🔒 LOCKED: CTA Band (CtaBand.jsx)
- File: `src/components/CtaBand.jsx`
- **100% PERMANENTLY LOCKED**: Do not make ANY changes to this component ever again. The mobile layout, car positioning (`-top-16`, `-left-12`), sizing, spacing, text padding (`pl-[500px]`), and all desktop and mobile styles are finalized. No further adjustments are permitted under any circumstances.
# Urgent Taxis SEO Development Plan Reference

Before starting any SEO, route page, city page, blog, or schema related task, agents must read:

- WEBSITE_PLAN.md

Agents must follow the development priority from WEBSITE_PLAN.md.

Development order:
1. Route data file
2. Dynamic route page
3. Route URL system
4. City page system
5. Blog system
6. SEO schema
7. Internal linking
8. Google Search Console submission

Do not change locked UI sections while working on SEO pages or data files.

## 🔒 LOCKED: Scroll Restoration
- File: `src/components/ScrollToTop.jsx`
- **100% PERMANENTLY LOCKED**: The logic that enforces scroll to top on every route change and page reload (`history.scrollRestoration = 'manual'` and `window.scrollTo(0, 0)`) must not be modified or removed. Every page must always load at the very top.
## Future Lock Rule
Future changes must not introduce clipped/cut text, hidden H1, horizontal overflow, or fixed-height hero content that breaks on mobile/desktop. Existing responsive spacing and typography must be preserved unless explicitly approved.
