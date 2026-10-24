# ClawExerMart Story Test Plan (STP)
*Based on Michael Leonard's Story Test Plan Framework ("Develop test automation as you go")*

---

## 🎯 Executive Summary & Purpose

The **Story Test Plan (STP)** establishes the quality engineering strategy for **ClawExerMart**, an online marketplace and showcase for premium new and pre-owned gym equipment. Following Michael Leonard's methodology, this document bridges user story refinement and test automation development. Rather than treating testing as a downstream afterthought, testing requirements are structured across four fundamental dimensions:
- **What to test**: The exact scope and layer under verification.
- **How**: The execution harness, isolation mechanics, and mock boundaries.
- **Why**: The specific risk mitigation and business impact.
- **When**: The trigger point in the developer and CI/CD lifecycle.

---

## 🏗️ 4-Tier Testing Hierarchy

```
       ▲
      / \     [Tier 4: Exploratory & Visual Critic] — Feel, Motion, Aesthetics
     /   \    [Tier 3: End-to-End (E2E) Acceptance] — The Rabbit Path & Full Workflows
    /     \   [Tier 2: Component & Integration]     — State Transitions, DOM, UI Logic
   /_______\  [Tier 1: Unit Tests]                  — Pure Algorithms, Pricing, Clearances
```

---

### Tier 1: Unit Tests

#### 1.1 Equipment Valuation & Resale Algorithms (`src/utils/valuation.ts`)
- **What to test**: Resale value calculation based on equipment brand, model, condition tier (`NEW`, `CERTIFIED_REFURBISHED`, `USED_LIKE_NEW`, `USED_GOOD`, `USED_FAIR`), and original MSRP.
- **How**: Vitest isolated pure function tests passing deterministic parameter matrices.
- **Why**: Prevent catastrophic financial miscalculations in instant buyout offers and protect marketplace pricing credibility.
- **When**: Pre-commit hook on local machine and on every `git push`.

#### 1.2 Gym Space & Clearance Mathematical Models (`src/utils/spaceCalculator.ts`)
- **What to test**: Calculation of physical floor footprint ($\text{Length} \times \text{Width}$) and ceiling clearance margin ($\text{Ceiling Height} - \text{Equipment Clearance Requirement}$).
- **How**: Unit tests validating boundary conditions (e.g., exactly 8ft ceiling vs 90" power rack, negative overhead clearance triggering conflict flags).
- **Why**: Guarantee buyers do not purchase high-tonnage power racks or functional trainers that cannot be assembled in their garage or basement.
- **When**: Every code push before build compilation.

#### 1.3 Freight Weight & Delivery Tier Pricing
- **What to test**: Tiered shipping calculation based on weight (standard ground vs LTL freight curbside vs white-glove inside delivery).
- **How**: Parameterized unit tests against known freight weight thresholds ($> 150 \text{ lbs}$).
- **Why**: Ensure customers are never undercharged or overbilled for freight logistics.
- **When**: Every code push.

---

### Tier 2: Component & Integration Tests

#### 2.1 Marketplace Catalog & Dynamic Filtering (`src/components/Catalog.tsx`)
- **What to test**:
  - Filter by condition (All vs New vs Used/Refurbished).
  - Filter by equipment category (Cardio, Strength, Free Weights, Accessories).
  - Search query debouncing and text matching.
  - Price sorting (Ascending, Descending, Highest Savings %).
- **How**: `@testing-library/react` and `@testing-library/user-event` in `jsdom` testing state transitions and DOM rendering.
- **Why**: Fast, reliable verification that users can navigate and discover equipment without regressions.
- **When**: Pull Request creation and CI validation pipeline.

#### 2.2 Product Detail Modal & Physical Inspection Sheet (`src/components/ProductDetailModal.tsx`)
- **What to test**:
  - Modal expansion from trigger card.
  - Accurate rendering of 8-point certified technician inspection scores (frame, cables, rust, bearings, upholstery).
  - "Make an Offer" counter-offer validation (rejecting negative or zero offers; accepting valid range).
  - "Add to Cart" state synchronization with Cart Context.
- **How**: Component mounting with React Testing Library, triggering clicks and form submissions.
- **Why**: The inspection report is the core value proposition for buying pre-owned equipment online.
- **When**: PR pipeline and pre-merge gate.

#### 2.3 Sell & Consignment Equipment Submission Flow (`src/components/SellPortal.tsx`)
- **What to test**:
  - Multi-step form step advancement.
  - Reactive price gauge updating when user selects condition or brand.
  - Required field validations (email, zip code, condition checklist).
  - Successful submission acknowledgment banner.
- **How**: Form simulation via `@testing-library/user-event`.
- **Why**: Sellers must have a frictionless intake process to ensure marketplace inventory supply.
- **When**: PR pipeline.

#### 2.4 Gym Space & Ceiling Clearance Matcher (`src/components/GymSpaceMatcher.tsx`)
- **What to test**:
  - User input of room dimensions (length, width, ceiling height in feet/inches).
  - Reactive filtering of inventory into "Fits Perfectly" vs "Ceiling Clearance Warning" vs "Footprint Too Large".
- **How**: Component tests asserting badge colors and equipment filtering outcomes.
- **Why**: Ensure interactive showcase tools guide customer purchasing decisions accurately.
- **When**: PR pipeline.

---

### Tier 3: End-to-End (E2E) & Acceptance Tests

#### 3.1 The "Rabbit Path" (Critical Buyer Journey)
- **What to test**:
  1. User arrives on homepage.
  2. Filters for Used Strength Equipment (e.g., Rogue Power Rack).
  3. Opens Product Detail view and inspects certified technician condition report.
  4. Clicks "Make an Offer", inputs \$650, submits counter-offer.
  5. Adds item to cart, selects Freight Curbside Delivery, opens Cart drawer.
  6. Completes checkout simulation and receives confirmed order ticket.
- **How**: Non-headless headed browser execution (`@e2e-dev/web` or Playwright `--headed`) testing goal-directed actions (`agent.act`).
- **Why**: Verify that the primary revenue-generating funnel operates smoothly from first click to final conversion.
- **When**: Executed automatically upon deployment to staging/preview environments.

#### 3.2 The Consignment Seller Journey
- **What to test**:
  1. User switches to "Sell Your Gear" portal.
  2. Enters equipment details (Category: Cardio, Brand: Concept2, Model: RowErg, Condition: Used - Good).
  3. Observes dynamic estimated valuation range (\$600 - \$750).
  4. Submits listing with inspection preference.
  5. Receives listing confirmation with appraisal tracking code.
- **How**: Headed browser automation.
- **Why**: Verify marketplace supply pipeline from seller onboarding to appraisal generation.
- **When**: Nightly regression runs and pre-release gates.

---

### Tier 4: Exploratory, Visual Critic & Motion Tests

#### 4.1 Apple Design & Emil Kowalski Motion Compliance
- **What to test**:
  - **Tactile press feedback**: All interactive buttons, cards, and tabs respond on pointer-down with `scale(0.97)` and instant opacity feedback.
  - **Frosted glass chrome**: Sticky navigation and modal overlays render with `backdrop-filter: blur(20px) saturate(180%)` without jarring scroll stutter.
  - **Sub-300ms budget**: All UI state transitions complete under 300ms using custom ease-out curves (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - **Origin-aware modals**: Product detail modals originate visually from the clicked card coordinate.
  - **Zero layout shifting**: No animations on `width`, `height`, `margin`, or `top/left`; strictly `transform` and `opacity`.
- **How**: Visual capture to `captures/R<n>_<screen>.png` evaluated against `STANDARDS.md` and `art/BAR.md`.
- **Why**: High-craft aesthetics build customer confidence when spending thousands of dollars on heavy gym equipment.
- **When**: Feature sign-off before tagging a release.

#### 4.2 Adversarial UI Edge-Case Testing (`break-ui`)
- **What to test**:
  - Extreme equipment title lengths (e.g., 200 character industrial commercial multi-station name).
  - Zero-item filter states ("No equipment found in this radius").
  - Fractional or extreme prices (\$0.99, \$99,999).
  - Viewport stress testing on iPhone SE (375px), iPad Mini (768px), and Ultra-wide (2560px).
- **How**: Stress-testing toggle injecting extreme mock payloads.
- **Why**: Prevent layout breakage in production environments.
- **When**: Milestone hardening phase.

---

## 🚀 Expanded Test Coverage Beyond What We Build (Roadmap)

To fulfill the Story Test Plan framework's full vision as the platform scales into production, the following test suites are specified for downstream implementation:

| Test Domain | Target Subsystem | Automation Tool | Test Scenario | Acceptance Criteria |
| :--- | :--- | :--- | :--- | :--- |
| **LTL Freight Webhooks** | Logistics Service | Karate DSL / WireMock | Carrier dispatch webhook (R&L Carriers / Estes Express) firing tracking events (`DISPATCHED`, `OUT_FOR_DELIVERY`, `DELIVERED_POD_SIGNED`). | System updates shipment status within 500ms; customer receives automated SMS notification. |
| **Stripe Escrow & Payouts** | Financial Gateway | Pytest (`stripe-mock`) | Two-party escrow hold: buyer funds captured at order, held during 48-hour mechanical inspection window, released to seller upon inspection sign-off. | Escrow cannot release funds prematurely if buyer opens "Mechanical Defect Dispute". |
| **Mobile Tech Inspection App** | Offline PWA / ADB | Appium / Pure ADB | Mobile technician in warehouse running without WiFi: logs 24-point checklist, takes photo of serial plate, saves offline, syncs when network restored. | Zero data loss during offline-to-online reconciliation; conflict-free sync. |
| **Real-time Offer Bidding** | WebSocket Engine | k6 / Artillery | 500 simultaneous users submitting competing counter-offers on a rare Rogue Monster Rack auction. | Sub-50ms message broadcast latency; 100% atomic transaction ordering with zero race conditions. |
| **High-Volume Load Stress** | CDN & SSR Clusters | k6 Cloud | 10,000 concurrent gym buyers during New Year Resolution flash sale (Jan 1). | 99th percentile response time $< 250\text{ms}$; 0% HTTP 5xx error rate. |
| **Accessibility Audit (a11y)** | Entire Web Application | axe-core / Pa11y | WCAG 2.1 AA and AAA automated audit covering screen reader attributes (`aria-label`, `role="dialog"`, keyboard tab focus trap). | Zero critical or serious accessibility violations across all interactive routes. |
