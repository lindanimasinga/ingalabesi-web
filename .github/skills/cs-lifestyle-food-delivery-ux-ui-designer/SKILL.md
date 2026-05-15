---
name: cs-lifestyle-food-delivery-ux-ui-designer
description: "UI UX consistency skill for the food delivery webapp. Use when adding or fixing Angular pages and you must keep existing branding, typography, buttons, spacing, cards, menu, headings, alerts, forms, and flow behavior consistent across all screens."
argument-hint: "Describe the screen, UX issue, route/component, and whether this is a new screen or an update."
user-invocable: true
disable-model-invocation: false
---

# CS Lifestyle UI UX Consistency Skill

## What This Skill Produces
A design-consistent implementation plan and code-level UI guidance for Angular HTML/CSS screens in cs-lifestyle, aligned with existing branding, typography, components, spacing, and flow behavior.

## When To Use
- Adding or updating Angular pages in src/app
- Fixing inconsistent button, card, menu, heading, alert, or form styling
- Harmonizing checkout, shipping, payment, orders, login, and store browsing flows
- Reviewing visual regressions after feature changes
- Applying marketplace/store branding while preserving app-wide consistency

## Core UI System To Preserve
- Typography:
  - Fonts are Calibri and Catamaran from src/styles.css
- Color system:
  - Use CSS variables already used across app (for example var(--text-color), var(--bkg-card-color), var(--btn-bg-color), var(--btn-bg-selected-color), var(--footer-bkg-color), var(--footer-text-color))
- Buttons:
  - Base .btn style is full-width with zero-radius and consistent padding/weight
- Cards:
  - Borderless cards with var(--bkg-card-color)
- Accessibility:
  - Preserve focus outlines, sr-only utility classes, and reduced-motion behavior from src/styles.css
- Dynamic branding:
  - Keep store-level brand colors in harmony with shared layout behavior

## Workflow

1. Map the flow before touching styles.
- Identify user path and route transitions involved (for example home -> item -> cart -> shipping -> payment -> order tracking).
- Confirm whether the change affects one screen or a full flow.

2. Audit existing nearby patterns.
- Inspect closest matching components first (for example store-card, shop-item, checkout, shipping, payment, orders).
- Reuse existing class names and spacing rhythm where possible.
- Prefer extending existing component CSS over introducing new style systems.

3. Decide design scope using branch logic.
- If this is a bug fix:
  - Keep existing structure and apply minimal visual correction.
- If this is a new section in an existing screen:
  - Match existing typography, heading scale, button treatment, and card style.
- If this is a brand-new screen:
  - Compose from existing primitives first (.btn, .card, form-control, list-group-item, page header pattern).
  - Only add new utility classes when no existing pattern fits.

4. Implement with consistency constraints.
- Do:
  - Use design tokens and existing CSS variables.
  - Keep button hierarchy and spacing predictable.
  - Preserve responsive behavior and mobile readability.
  - Keep forms aligned with existing label/input/error conventions.
- Avoid:
  - One-off colors, random border radii, or ad-hoc typography.
  - Replacing established patterns with unrelated UI paradigms.
  - Mixing conflicting component layouts in a single flow.

5. Validate behavior and visual quality.
- Check desktop and mobile layout.
- Verify focus states and keyboard navigation remain visible.
- Verify no flow regressions in critical journeys:
  - login OTP
  - store browsing
  - cart and checkout
  - shipping and payment callback
  - orders and order detail

## Quality Criteria (Definition of Done)
- Visual consistency:
  - Typography, spacing, cards, buttons, and headings match neighboring screens.
- Branding consistency:
  - Existing color variables and store branding behavior remain intact.
- Interaction consistency:
  - Form, alert, and button behavior follows existing app conventions.
- Accessibility baseline:
  - Focus rings, readable contrast, and reduced-motion support are preserved.
- Flow integrity:
  - No broken route transitions or CTA confusion across checkout/payment/order flows.

## Output Format For This Skill
When invoked, return:
1. A concise UI consistency audit summary
2. Exact files to edit with rationale
3. Proposed changes grouped by component
4. Validation checklist for responsive, accessibility, and flow behavior
5. Any residual UI risk after implementation

## Useful Workspace References
- src/styles.css
- src/app/store-card/store-card.component.css
- src/app/order-card/order-card.component.css
- src/app/shop-item/shop-item.component.css
- src/app/app-routing.module.ts
