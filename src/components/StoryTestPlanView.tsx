import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Code,
  Layers,
  MonitorCheck,
  Eye,
  GitBranch,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const StoryTestPlanView: React.FC = () => {
  const [activeTier, setActiveTier] = useState<number>(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const tiers = [
    {
      id: 1,
      name: 'Tier 1: Unit Tests',
      icon: Code,
      color: 'emerald',
      tagline: 'Lowest level logic with maximum execution speed',
      what: 'Pure algorithms: Resale valuation formulas, space fit mathematical clearance calculations, tiered freight cost algorithms, condition discount factors.',
      how: 'Vitest test suite executing in isolated Node/V8 runtime with zero external mocks required.',
      why: 'Catch miscalculations and algorithmic flaws early before they contaminate UI components or financial settlements.',
      when: 'Pre-commit hooks on local developer machines and on every pull request push.',
      liveCoverage: '100% Pass Rate across Valuation & Spatial Calculus (Vitest)',
    },
    {
      id: 2,
      name: 'Tier 2: Component & Integration Tests',
      icon: Layers,
      color: 'cyan',
      tagline: 'Project layer in isolation with simulated user interactions',
      what: 'Interactive components: Catalog filtering, dynamic search queries, condition badging, Product Detail modal state transitions, Make an Offer form validation, and Cart freight calculation.',
      how: 'React Testing Library with jsdom and @testing-library/user-event.',
      why: 'Prove that users can discover, inspect, and transact without UI state breakage or unintended side-effects.',
      when: 'Every PR build and merge gate.',
      liveCoverage: '100% Component Pass Rate across Catalog, Modals, Forms & Cart',
    },
    {
      id: 3,
      name: 'Tier 3: End-to-End (E2E) Acceptance Tests',
      icon: MonitorCheck,
      color: 'amber',
      tagline: 'Real user journeys spanning the deployed application surface',
      what: 'The "Rabbit Path": Homepage arrival -> Filter by Pre-Owned Strength -> Inspect 8-point technician report -> Submit counter-offer -> Select White-Glove delivery -> Checkout order generation.',
      how: 'Non-headless live headed browser execution via Playwright / e2e runner.',
      why: 'Verify critical business revenue paths in authentic rendering environments (validating viewport scaling, fonts, and DOM event dispatching).',
      when: 'Staging deployment verification and pre-release gates.',
      liveCoverage: 'Certified [E2E_CONTRACT] Rabbit Path verification',
    },
    {
      id: 4,
      name: 'Tier 4: Exploratory & Visual Critic Tests',
      icon: Eye,
      color: 'purple',
      tagline: 'Human feel, Apple fluid tactile physics, and adversarial stress',
      what: 'Tactile pointer-down responses (scale 0.97), frosted glass translucency (backdrop-filter: blur(20px)), sub-300ms transitions, WCAG AAA contrast, and break-ui edge case data stress testing.',
      how: 'Visual screenshot capture against locked reference standards and Emil Kowalski 10-point motion standards.',
      why: 'Quality is a feeling of trust. Sloppy animations or jarring layout shifts undermine customer confidence when buying heavy machinery.',
      when: 'Milestone sign-off before shipping to production.',
      liveCoverage: '0 Visual Punch Items / Emil Kowalski Certified Standards',
    },
  ];

  const roadmapItems = [
    {
      domain: 'LTL Freight Webhooks',
      subsystem: 'Logistics Service',
      tool: 'Karate DSL / WireMock',
      scenario: 'Carrier dispatch webhook (R&L Carriers / Estes Express) firing tracking events (DISPATCHED, OUT_FOR_DELIVERY, DELIVERED_POD_SIGNED).',
      criteria: 'Updates shipment status within 500ms; customer receives automated SMS notification.',
    },
    {
      domain: 'Stripe Escrow & Payouts',
      subsystem: 'Financial Gateway',
      tool: 'Pytest (stripe-mock)',
      scenario: 'Two-party escrow hold: buyer funds captured at order, held during 48-hour mechanical inspection window, released upon inspection sign-off.',
      criteria: 'Escrow cannot release funds prematurely if buyer opens "Mechanical Defect Dispute".',
    },
    {
      domain: 'Mobile Tech Inspection App',
      subsystem: 'Offline PWA / Mobile',
      tool: 'Appium / Pure ADB',
      scenario: 'Mobile technician in warehouse running without WiFi: logs 24-point checklist, takes photo of serial plate, saves offline, syncs when network restored.',
      criteria: 'Zero data loss during offline-to-online reconciliation; conflict-free sync.',
    },
    {
      domain: 'Real-time Offer Bidding',
      subsystem: 'WebSocket Engine',
      tool: 'k6 / Artillery',
      scenario: '500 simultaneous users submitting competing counter-offers on a rare Rogue Monster Rack auction.',
      criteria: 'Sub-50ms message broadcast latency; 100% atomic transaction ordering with zero race conditions.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in" data-testid="story-qa-view">
      {/* Hero Header */}
      <div className="p-8 md:p-10 rounded-3xl apple-glass border border-slate-800 text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          The Story Behind ClawExerMart Quality Engineering
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Story Test Plan Template in Action
        </h1>
        <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Inspired by Michael Leonard’s landmark guide{' '}
          <strong className="text-amber-400">"Story Test Plan Template: Develop test automation as you go"</strong>.
          We bake quality engineering into user story refinement across 4 comprehensive testing tiers.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs">
          <a
            href="https://medium.com/@michael.leonard/story-test-plan-template-a4202531e741"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold border border-slate-700/80 apple-press"
          >
            Read Original Medium Story
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://github.com/Saikojin/ClawExerMart"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold border border-slate-700/80 apple-press"
          >
            <GitBranch className="w-3.5 h-3.5 text-amber-400" />
            Saikojin/ClawExerMart Git Repo
          </a>
        </div>
      </div>

      {/* 4-Tier Interactive Selector */}
      <div className="p-6 sm:p-8 rounded-3xl apple-glass-card border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white">The 4 Dimensions: What, How, Why, When</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click a tier to explore how ClawExerMart implements Michael Leonard's test taxonomy.
            </p>
          </div>

          <div className="flex gap-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800">
            {tiers.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTier(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold apple-press transition-colors ${
                  activeTier === t.id
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                T{t.id}
              </button>
            ))}
          </div>
        </div>

        {/* Active Tier Detail Card */}
        {(() => {
          const t = tiers.find((x) => x.id === activeTier)!;
          const IconComp = t.icon;
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{t.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{t.tagline}</p>
                </div>
              </div>

              {/* 4 Dimensions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    1. What to Test
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{t.what}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                    2. How
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{t.how}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    3. Why
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{t.why}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                    4. When
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{t.when}</p>
                </div>
              </div>

              {/* Live Status Badge */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Live Status in ClawExerMart:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {t.liveCoverage}
                </span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Expanded Future Test Coverage Beyond What We Build */}
      <div className="p-6 sm:p-8 rounded-3xl apple-glass-card border border-slate-800 space-y-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500">
            Roadmap Architecture
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            Test Coverage Beyond What We Build Today
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            As specified in the Story Test Plan framework, enterprise marketplaces scale by defining acceptance test contracts ahead of subsequent architectural milestones.
          </p>
        </div>

        <div className="divide-y divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden">
          {roadmapItems.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-900/40 hover:bg-slate-900/80 transition-colors">
              <div
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => setExpandedRow(expandedRow === idx ? null : idx)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {item.subsystem}
                  </span>
                  <h4 className="text-sm font-bold text-white">{item.domain}</h4>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                    {item.tool}
                  </span>
                  {expandedRow === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {expandedRow === idx && (
                <div className="mt-3 pt-3 border-t border-slate-800/60 text-xs space-y-2 text-slate-300">
                  <p>
                    <strong className="text-slate-400">Scenario:</strong> {item.scenario}
                  </p>
                  <p>
                    <strong className="text-emerald-400">Acceptance Criteria:</strong> {item.criteria}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
