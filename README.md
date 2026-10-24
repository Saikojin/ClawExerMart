# ClawExerMart 🏋️‍♂️

> Premium New & Pre-Owned Fitness & Gym Equipment Marketplace and Showcase.

Built with **React 18**, **Vite**, **TypeScript**, and **Tailwind CSS**. **Zero PHP vulnerability footprint.**

---

## 🌟 Key Features

1. **New & Pre-Owned Equipment Marketplace (`Catalog.tsx`)**:
   - Filter by condition: `Brand New (Factory Sealed)`, `Certified Refurbished`, `Pre-Owned Like New`, `Pre-Owned Good`, `Pre-Owned Fair`.
   - Category filtering: `Strength & Racks`, `Cardio & Rowers`, `Free Weights & Barbells`, `Accessories`.
   - Real-time search, sorting by discount %, price, and release year.
   - Price comparison with instant savings tags vs original MSRP.

2. **Certified 8-Point Physical Inspection Sheet (`InspectionChecklist.tsx`)**:
   - Frame and weld integrity, bearing/bushing spin runout, cable tension & pulleys, upholstery rebound, oxidation scan, and safety latch testing.
   - Verified technician diagnostic notes and inspection date.

3. **Direct Seller Negotiation & Offers (`MakeOfferModal.tsx`)**:
   - Submit counter-offers on pre-owned gear with live percentage-of-asking rating (Sweet Spot vs Low-ball warning).

4. **Sell & Consignment Valuation Portal (`SellPortal.tsx`)**:
   - Algorithmic valuation calculating recommended resale listing range and instant Claw cash buyout offers based on brand retention and condition tier.

5. **Gym Space & Ceiling Clearance Matcher (`GymSpaceMatcher.tsx`)**:
   - Input room length, width, and ceiling height (with presets for 8ft basements, 9.5ft 2-car garages, etc.) to immediately verify equipment overhead pull-up and floor footprint clearance.

6. **Freight Delivery & Logistics Simulator (`CartDrawer.tsx`)**:
   - Select Local Pickup ($0), Freight Curbside (Hydraulic Liftgate), or White-Glove Room of Choice assembly.
   - One-click simulated checkout producing verifiable waybills and inspection receipts.

---

## 🧪 Quality Engineering & Testing Strategy

Modeled after **Michael Leonard's Story Test Plan Template** (*"Develop test automation as you go"*, [Medium Article](https://medium.com/@michael.leonard/story-test-plan-template-a4202531e741)):

1. **Tier 1: Unit Tests** (`src/test/domainUtils.test.ts`, `src/test/mockData.test.ts`)
   - Pure valuation algorithms, condition discount factor matrix, and spatial clearance math.
2. **Tier 2: Component & Integration Tests** (`src/test/*.test.tsx`)
   - 21 component tests covering Catalog filtering, modal transitions, offer submissions, sell forms, and cart calculations.
3. **Tier 3: Non-Headless End-to-End Tests** (`scripts/run-e2e.mjs`)
   - Complete "Rabbit Path" verified in visible windowed Chrome with multi-modal frame captures saved to `captures/`.
4. **Tier 4: Visual & Motion Review** (`docs/WORKFLOW_LOG.md`)
   - Emil Kowalski 10-point animation standards audit (sub-300ms, GPU properties only, scale-from-0.98, `prefers-reduced-motion`).

See [docs/STORY_TEST_PLAN.md](docs/STORY_TEST_PLAN.md) and [docs/WORKFLOW_LOG.md](docs/WORKFLOW_LOG.md) for complete details.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
git clone https://github.com/Saikojin/ClawExerMart.git
cd ClawExerMart
npm install
```

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Running Test Suite
```bash
npm test
```

### Running Non-Headless E2E Suite
```bash
npm run build
node scripts/run-e2e.mjs
```
