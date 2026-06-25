# Ingalabesi UI Brand Migration Handoff

## Purpose
This document defines the UI migration required to align ingalabesi-web with the approved Ingalabesi brand system.

## Scope
- Global tokens and typography
- Core UI primitives (buttons, cards, inputs)
- Navigation consistency
- Footer and branding cleanup
- Route-level visual consistency

## Brand Tokens
Use the values below as the only source of truth.

```css
:root {
  --brand-primary: #E67B26;
  --brand-primary-dark: #C96A1A;
  --brand-secondary: #EDE4CB;
  --brand-black: #1A1A1A;
  --brand-white: #FFFFFF;
  --brand-text-on-primary: #FFFFFF;
  --brand-text-dark: #1A1A1A;
  --brand-text-muted: #6B6B6B;
  --brand-border: #D9D0B8;
  --brand-error: #D32F2F;
  --brand-success: #2E7D32;
}
```

## Typography
- Primary font: Catamaran
- Base text: 16px, line-height: 1.5
- Button text: 16px to 18px, font-weight: 600
- Remove active usage of Roboto and Calibri in customer-facing UI

## Layout and Shape
- Mobile-first base width: 390px
- Max content width: 480px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48
- Border radius: cards 12px, inputs 8px, CTA pills 50px
- Bottom nav: 64px + safe-area support

## Legacy Variable Migration Map
Replace existing legacy variables and style semantics using this map.

- --btn-bg-color -> --brand-primary
- --btn-bg-selected-color -> --brand-primary
- --btn-pill-color -> --brand-primary
- --footer-bkg-color -> --brand-secondary or --brand-white (by section intent)
- --footer-text-color -> --brand-text-dark
- --text-color -> --brand-text-dark
- --bkg-color -> --brand-secondary or --brand-white
- --bkg-card-color -> --brand-white
- --btn-red-color -> --brand-error

## Component Standards

### Primary CTA
- Background: --brand-primary
- Text: --brand-text-on-primary
- Width: 100%
- Radius: 50px
- Height: minimum 56px
- Hover/active: brightness filter

### Secondary CTA
- Background: --brand-black
- Text: --brand-white
- Width: 100%
- Radius: 50px
- Height: minimum 56px

### Inputs
- Radius: 8px
- Border: 1px solid --brand-border
- Focus outline: 2px solid --brand-primary

### Cards
- Background: --brand-white or --brand-secondary as needed
- Radius: 12px
- Border: subtle border using --brand-border when required

### Bottom Navigation
- Tabs: Home, Menu, Profile
- Active: --brand-primary
- Inactive: --brand-text-muted
- Background: --brand-white
- Border top: 1px solid #F0F0F0
- Icon size: 24px, label size: 11px

## Route-Level Design Targets
- / : Landing follows approved hero + CTA + contact + fixed bottom tabs composition
- /home (menu shell): use same typography and brand tokens as landing
- /home/item/:id : clear hierarchy, branded CTA emphasis
- /home/cart : strong totals hierarchy and primary checkout action
- /home/shipping : consistent input system and validation visuals
- /home/payment : branded feedback states for loading, success, error
- /home/orders and /home/order/:id : consistent cards and status clarity

## Brand Hygiene Rules
- No visible iZinga logos or dominant iZinga branding in customer-facing UI
- If legal attribution is required, keep it minimal and visually secondary
- Keep copyright year current

## Accessibility Requirements
- Keyboard access for all interactive controls
- Minimum touch target size 48px
- Visible focus style on buttons, links, and custom controls
- No contrast regressions on light backgrounds

## Implementation Plan
1. Introduce canonical design tokens and remove legacy token usage.
2. Normalize global primitives for buttons, cards, forms, and nav.
3. Align landing hero and CTA treatment to reference design.
4. Unify nav behavior and visual language between landing and app shell.
5. Update footer links, external link security attrs, and copy.
6. Run QA checklist and resolve all failed items.

## Definition of Done
- No legacy color variables in active UI styling
- Primary and secondary CTA styles fully standardized
- All key routes visually consistent with Ingalabesi brand
- Footer/nav links valid and accessible
- QA checklist passes with no blockers
