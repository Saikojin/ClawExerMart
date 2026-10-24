# ClawExerMart Architecture Plan & Execution DAG

## 🎯 Intent Restatement Gate
**Core Intent & Boundaries**: Architect and build a high-craft marketplace and showcase platform for new and used gym equipment (**ClawExerMart**) with rigorous quality engineering modeled after Michael Leonard's 4-tier Story Test Plan Template, implementing Apple fluid design principles and zero PHP dependencies.
**Expected Outcome**: A fully tested, responsive TypeScript web application featuring equipment cataloging, condition filtering, interactive wear inspection sheets, an equipment selling/consignment valuation portal, and a gym space footprint matcher, accompanied by automated unit/component tests, motion review, two-axis code review, and a complete workflow decision trail.

---

## 📋 Task DAG & Execution Frontier

- [x] **Task 01: Environment & Scaffolding Initialization**
  - **Edits**: `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `index.html`
  - **Verification**: `npm run build`
  - **[E2E_CONTRACT] (Non-Headless)**:
    - **Launch**: `npm run build`
    - **User Journey**: Verify build artifact compiles cleanly without type errors.
    - **Observable Done-When**: Vite outputs clean dist bundle with zero errors.
    - **Artifact**: `dist/index.html` generated.
  - **[GATE: QA]**: Certified (100% pass rate).

- [x] **Task 02: Core Domain Models & Rich Gym Equipment Dataset**
  - **Edits**: `src/types/equipment.ts`, `src/data/mockEquipment.ts`, `src/types/sell.ts`
  - **Verification**: `npx vitest run src/test/mockData.test.ts`
  - **[E2E_CONTRACT] (Non-Headless)**:
    - **Launch**: `npx vitest run src/test/mockData.test.ts`
    - **User Journey**: 1. Inspect equipment models for both New and Used items across categories. 2. Verify pricing, condition tiers, inspection checklists, and seller profiles.
    - **Observable Done-When**: All data contracts pass runtime validation and schema invariants.
    - **Artifact**: `src/test/mockData.test.ts` passes with 100% rate.
  - **[GATE: QA]**: Certified (100% pass rate).

- [x] **Task 03: Story Test Plan Template Specification**
  - **Edits**: `docs/STORY_TEST_PLAN.md`
  - **Verification**: `Test-Path docs/STORY_TEST_PLAN.md`
  - **[E2E_CONTRACT] (Non-Headless)**:
    - **Launch**: Markdown lint & structure audit
    - **User Journey**: Verify the 4-tier testing hierarchy (Unit, Integration, E2E, Exploratory) across What, How, Why, When with expanded roadmap coverage beyond the initial prototype.
    - **Observable Done-When**: `docs/STORY_TEST_PLAN.md` contains all 4 tiers with concrete gym marketplace scenarios.
    - **Artifact**: `docs/STORY_TEST_PLAN.md` verified.
  - **[GATE: QA]**: Certified.

- [x] **Task 04: Apple-Design UI System & Frosted Glass Chrome**
  - **Edits**: `src/index.css`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/Badge.tsx`
  - **Verification**: `npx vitest run src/test/Navbar.test.tsx`
  - **[E2E_CONTRACT] (Non-Headless)**:
    - **Launch**: `node scripts/run-e2e.mjs` (headed browser navigation)
    - **User Journey**: 1. Load header and navigation. 2. Observe frosted glass `backdrop-filter: blur(20px)` navbar. 3. Observe active tactile press states (`scale(0.97)`), negative tracking headings, and accessible color contrast.
    - **Observable Done-When**: Header sticky nav renders with glass blur and responsive tabs.
    - **Artifact**: `captures/R1_navbar.png`
  - **[GATE: VISUAL_CRITIC]**: Certified (0 punch items).

- [x] **Task 05: Marketplace Catalog, Filters & Condition Badging**
  - **Edits**: `src/components/Catalog.tsx`, `src/components/EquipmentCard.tsx`, `src/components/FilterSidebar.tsx`
  - **Verification**: `npx vitest run src/test/Catalog.test.tsx`
  - **[E2E_CONTRACT] (Non-Headless)**:
    - **Launch**: `node scripts/run-e2e.mjs`
    - **User Journey**: 1. Filter by Condition (New vs Pre-Owned/Refurbished). 2. Filter by Category (Cardio, Strength, Free Weights). 3. Sort by Price and Savings. 4. Toggle Instant Search query.
    - **Observable Done-When**: Filter results update dynamically, condition badges clearly distinguish New from Used with discount tags.
    - **Artifact**: `captures/R2_catalog.png`
  - **[GATE: QA]**: Certified (100% pass rate).

- [x] **Task 06: Product Inspection Modal & Interactive Wear Sheet**
  - **Edits**: `src/components/ProductDetailModal.tsx`, `src/components/InspectionChecklist.tsx`, `src/components/MakeOfferModal.tsx`
  - **Verification**: `npx vitest run src/test/ProductDetail.test.tsx`
  - **[E2E_CONTRACT] (Non-Headless)**:
    - **Launch**: `node scripts/run-e2e.mjs`
    - **User Journey**: 1. Click on a Used item. 2. View 8-point physical inspection report. 3. Click "Make an Offer" and submit counter-offer with validation. 4. Add to Cart.
    - **Observable Done-When**: Modal expands smoothly, inspection scores render with verified badges, offer form validates and acknowledges submission.
    - **Artifact**: `captures/R3_product_modal.png`
  - **[GATE: QA]**: Certified (100% pass rate).

- [x] **Task 07: Sell & Consignment Equipment Valuation Portal**
  - **Edits**: `src/components/SellPortal.tsx`, `src/utils/valuation.ts`
  - **Verification**: `npx vitest run src/test/SellPortal.test.tsx`
  - **[E2E_CONTRACT] (Non-Headless)**:
    - **Launch**: `node scripts/run-e2e.mjs`
    - **User Journey**: 1. Navigate to "Sell Your Gear" tab. 2. Select Category, Brand, Model, Condition rating. 3. Watch real-time Algorithmic Valuation Estimator calculate recommended listing price range and instant trade-in cash offer. 4. Complete multi-step equipment listing submission.
    - **Observable Done-When**: Live pricing gauge displays dynamic resale estimation based on condition tier; form submits with validation confirmation.
    - **Artifact**: `captures/R4_sell_portal.png`
  - **[GATE: QA]**: Certified (100% pass rate).

- [x] **Task 08: Gym Space & Ceiling Clearance Matcher**
  - **Edits**: `src/components/GymSpaceMatcher.tsx`, `src/utils/spaceCalculator.ts`
  - **Verification**: `npx vitest run src/test/GymSpaceMatcher.test.tsx`
  - **[E2E_CONTRACT] (Non-Headless)**:
    - **Launch**: `node scripts/run-e2e.mjs`
    - **User Journey**: 1. Switch to "Space Planner". 2. Input room length, width, and ceiling height. 3. View instant compatibility report showing which power racks, treadmills, and benches fit with required overhead clearance.
    - **Observable Done-When**: Equipment compatibility indicator displays Green (Fits with clearance) vs Red (Exceeds ceiling height/footprint).
    - **Artifact**: `captures/R5_space_matcher.png`
  - **[GATE: QA]**: Certified (100% pass rate).

- [x] **Task 09: Cart, Freight Delivery & Checkout Simulator**
  - **Edits**: `src/components/CartDrawer.tsx`, `src/context/CartContext.tsx`
  - **Verification**: `npx vitest run src/test/Cart.test.tsx`
  - **[E2E_CONTRACT] (Non-Headless)**:
    - **Launch**: `node scripts/run-e2e.mjs`
    - **User Journey**: 1. Open Cart drawer. 2. Select freight delivery tier. 3. Apply promo code or proceed to checkout simulation.
    - **Observable Done-When**: Cart totals recalculate freight weight and taxes; simulated checkout produces order confirmation with inspection certification summary.
    - **Artifact**: `captures/R6_cart_checkout.png`
  - **[GATE: QA]**: Certified (100% pass rate).

- [x] **Task 10: Animation & Motion Review Gate (`review-animations`)**
  - **Edits**: Evaluated against 10 Non-Negotiable Standards in `STANDARDS.md`.
  - **Verification**: Motion audit report in `docs/WORKFLOW_LOG.md`.
  - **[GATE: VISUAL_CRITIC]**: Approved (0 feel-breaking regressions, 0 non-GPU animations).

- [x] **Task 11: Two-Axis Code Review (`code-review`)**
  - **Edits**: Audit git diff against Standards (Fowler smell baseline) and Spec requirements.
  - **Verification**: Standards check + Spec fidelity check.
  - **[GATE: QA]**: Certified with 0 blockers.

- [x] **Task 12: Decision & Workflow Trail Log & Git Commit Stacking**
  - **Edits**: `docs/WORKFLOW_LOG.md`, git commit stack, push to origin/feat branch.
  - **Verification**: `git status` clean, git log clean.
  - **Artifact**: Complete end-of-task summary with thought process reflection.
