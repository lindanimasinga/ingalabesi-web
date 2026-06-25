# Ingalabesi Visual QA Checklist

Use this checklist to validate UI consistency against the approved Ingalabesi brand system.

## Global
- [ ] AC-UI-G-01: Catamaran is the active typeface across all customer-facing routes.
- [ ] AC-UI-G-02: Primary action color is #E67B26 and only used for action emphasis.
- [ ] AC-UI-G-03: Secondary actions use #1A1A1A where required.
- [ ] AC-UI-G-04: No visible iZinga logos or dominant iZinga branding in customer UI.
- [ ] AC-UI-G-05: Primary and secondary CTAs are full-width pill buttons.
- [ ] AC-UI-G-06: Touch targets are at least 48px.
- [ ] AC-UI-G-07: Focus states are visible for keyboard users.
- [ ] AC-UI-G-08: Contrast is acceptable for all body text and labels.
- [ ] AC-UI-G-09: Layout is stable at 390px and 480px widths.

## Landing (/)
- [ ] AC-UI-L-01: Hero image reads as full-bleed, photo-first treatment.
- [ ] AC-UI-L-02: CTA order is Book an Event first, Order Now second.
- [ ] AC-UI-L-03: Contact line is centered and legible.
- [ ] AC-UI-L-04: Bottom tab bar is fixed, with safe-area support.
- [ ] AC-UI-L-05: Bottom tab active state uses #E67B26.
- [ ] AC-UI-L-06: Bottom tab inactive state uses muted neutral text/icon color.
- [ ] AC-UI-L-07: Home, Menu, and Profile tabs are keyboard accessible.

## Menu Shell (/home)
- [ ] AC-UI-M-01: Header typography and color align with brand tokens.
- [ ] AC-UI-M-02: Product/list cards use approved surface and radius values.
- [ ] AC-UI-M-03: CTA hierarchy is visually clear and consistent.
- [ ] AC-UI-M-04: No legacy token colors appear in visible UI.

## Item Detail (/home/item/:id)
- [ ] AC-UI-I-01: Item title, image, and pricing hierarchy is clear on mobile.
- [ ] AC-UI-I-02: Add-to-cart action uses primary pill style.
- [ ] AC-UI-I-03: Quantity/options controls are touch friendly.
- [ ] AC-UI-I-04: Error/unavailable states use approved error styling.

## Cart (/home/cart)
- [ ] AC-UI-C-01: Cart line items are readable at 390px width.
- [ ] AC-UI-C-02: Totals and checkout action are visually prioritized.
- [ ] AC-UI-C-03: Empty cart state has clear primary next action.
- [ ] AC-UI-C-04: Edit/remove actions remain accessible and obvious.

## Login and Verification
- [ ] AC-UI-LO-01: Input styling is consistent with branded form system.
- [ ] AC-UI-LO-02: OTP and phone flows have clear error/help messaging.
- [ ] AC-UI-LO-03: Primary continue/submit actions use branded pills.

## Shipping (/home/shipping)
- [ ] AC-UI-S-01: Form layout follows spacing scale and input radius standards.
- [ ] AC-UI-S-02: Delivery and collection options are visually distinct.
- [ ] AC-UI-S-03: Continue action is a primary brand CTA.
- [ ] AC-UI-S-04: Validation messages are visible and non-overlapping.

## Payment (/home/payment)
- [ ] AC-UI-P-01: Payment screen reflects Ingalabesi visual identity.
- [ ] AC-UI-P-02: Pay/confirm actions maintain primary CTA prominence.
- [ ] AC-UI-P-03: Loading, success, and failure states are clear and branded.

## My Orders (/home/orders)
- [ ] AC-UI-O-01: Order cards are consistent with card system and spacing.
- [ ] AC-UI-O-02: Order actions are clearly prioritized.
- [ ] AC-UI-O-03: Empty state guidance is actionable.

## Order Tracking (/home/order/:id)
- [ ] AC-UI-T-01: Current order status is obvious at a glance.
- [ ] AC-UI-T-02: Timeline/state text is legible and well spaced.
- [ ] AC-UI-T-03: Status color use follows brand semantics.

## Footer and Navigation
- [ ] AC-UI-F-01: Footer links route to valid paths.
- [ ] AC-UI-F-02: External target blank links include rel="noopener noreferrer".
- [ ] AC-UI-F-03: Footer copy uses current year.
- [ ] AC-UI-F-04: Navigation behavior is consistent across landing and app routes.

## Release Sign-off
- [ ] AC-UI-R-01: All checklist items pass on mobile viewport.
- [ ] AC-UI-R-02: All checklist items pass on desktop centered layout.
- [ ] AC-UI-R-03: No critical accessibility regressions remain.
