# Ingalabesi UI Brand Work Assignment

## Objective
Assign each workstream from the brand migration and UI QA package to the responsible iZinga role for execution.

## Assigned Roles
- UI ownership: iZinga Food Web UI UX Designer
- Frontend implementation ownership: iZinga Food Web Developer
- Validation ownership: iZinga QA & Test Automation
- Final gate ownership: iZinga Code Reviewer

## Workstreams and Owners

### WS-01 Brand Token Migration
- Owner: iZinga Food Web Developer
- Design authority: iZinga Food Web UI UX Designer
- Scope:
  - Global token normalization
  - Legacy variable replacement
  - Shared primitive style updates in global styles
- Input docs:
  - docs/DESIGN_HANDOFF.md
  - docs/QA_CHECKLIST.md
- Acceptance:
  - No active legacy theme tokens in customer UI paths
  - Brand palette and typography applied consistently

### WS-02 Landing and Bottom Navigation Alignment
- Owner: iZinga Food Web UI UX Designer
- Implementer: iZinga Food Web Developer
- Scope:
  - Landing visual alignment (hero, CTA hierarchy, contact line)
  - Bottom tab behavior consistency and accessibility
  - Active/inactive color alignment to brand system
- Acceptance:
  - AC-UI-L-01 through AC-UI-L-07 all pass

### WS-03 Shell and Route Consistency
- Owner: iZinga Food Web Developer
- Design support: iZinga Food Web UI UX Designer
- Scope:
  - Main shell nav consistency across menu, cart, shipping, payment, orders
  - Primitive UI consistency for buttons/cards/forms
  - Remove mixed style behavior between landing and app shell
- Acceptance:
  - AC-UI-M, AC-UI-I, AC-UI-C, AC-UI-S, AC-UI-P, AC-UI-O, AC-UI-T all pass

### WS-04 Footer and Brand Hygiene Cleanup
- Owner: iZinga Food Web Developer
- Design signoff: iZinga Food Web UI UX Designer
- Scope:
  - Fix footer route targets
  - Add security attributes for external links that open in new tabs
  - Refresh footer copy and remove outdated/legacy branding artifacts where required
- Acceptance:
  - AC-UI-F-01 through AC-UI-F-04 all pass

### WS-05 Accessibility and Responsiveness Pass
- Owner: iZinga Food Web UI UX Designer
- Implementer: iZinga Food Web Developer
- Scope:
  - Focus visibility
  - Touch targets
  - Contrast checks
  - Mobile and desktop consistency checks
- Acceptance:
  - AC-UI-G-06 through AC-UI-G-09 and AC-UI-R-01 through AC-UI-R-03 all pass

## Execution Order
1. WS-01 Brand Token Migration
2. WS-02 Landing and Bottom Navigation Alignment
3. WS-03 Shell and Route Consistency
4. WS-04 Footer and Brand Hygiene Cleanup
5. WS-05 Accessibility and Responsiveness Pass
6. QA checklist execution and reviewer gate

## Delivery Artifacts Required
- Updated Angular HTML and CSS files per workstream
- Completed checklist with pass/fail statuses in docs/QA_CHECKLIST.md
- Short implementation summary per workstream
- Reviewer verdict before release

## Recommended Gitflow
- Branch type: feature
- Branch name: feature/ingalabesi-ui-brand-alignment
- PR target: develop

## Status Board
- WS-01: In progress
- WS-02: In progress
- WS-03: Not started
- WS-04: Completed
- WS-05: Not started
- QA: Not started
- Review: Not started
