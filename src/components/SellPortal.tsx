import React, { useState, useMemo } from 'react';
import { EquipmentCategory, EquipmentCondition } from '../types/equipment';
import { calculateEquipmentValuation } from '../utils/valuation';
import {
  DollarSign,
  TrendingUp,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  Send,
  HelpCircle,
} from 'lucide-react';

const COMMON_BRANDS = [
  'Rogue Fitness',
  'Concept2',
  'Rep Fitness',
  'Eleiko',
  'Life Fitness',
  'Bowflex',
  'Titan Fitness',
  'Kabuki Strength',
  'Assault Fitness',
  'PRx Performance',
  'Ironmaster',
];

export const SellPortal: React.FC = () => {
  const [category, setCategory] = useState<EquipmentCategory>('STRENGTH');
  const [brand, setBrand] = useState<string>('Rogue Fitness');
  const [customBrand, setCustomBrand] = useState<string>('');
  const [model, setModel] = useState<string>('Monster Lite Rack');
  const [yearPurchased, setYearPurchased] = useState<number>(2023);
  const [condition, setCondition] = useState<EquipmentCondition>('USED_LIKE_NEW');
  const [originalMsrp, setOriginalMsrp] = useState<number>(995);
  const [userAskingPrice, setUserAskingPrice] = useState<number>(750);
  const [ownerEmail, setOwnerEmail] = useState<string>('');
  const [ownerZip, setOwnerZip] = useState<string>('78701');
  const [inspectionPref, setInspectionPref] = useState<'CLAW_MOBILE' | 'FREIGHT_PICKUP' | 'LOCAL_DEPOT'>('CLAW_MOBILE');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const effectiveBrand = brand === 'OTHER' ? customBrand || 'Custom' : brand;

  // Reactive Algorithmic Valuation
  const valuation = useMemo(() => {
    return calculateEquipmentValuation({
      category,
      brand: effectiveBrand,
      originalMsrp,
      condition,
      yearPurchased,
    });
  }, [category, effectiveBrand, originalMsrp, condition, yearPurchased]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in" data-testid="sell-portal">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl apple-glass border border-slate-800 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Claw Valuation Engine & Consignment Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Sell Your Gym Equipment
        </h1>
        <p className="mt-2 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Get an instant algorithmic valuation based on live secondary-market sales. Choose between an instant cash buyout or consigning on our verified buyer network.
        </p>
      </div>

      {isSubmitted ? (
        <div
          data-testid="sell-submission-success"
          className="p-10 rounded-3xl apple-glass border border-emerald-500/30 text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Listing Appraisal Initiated!</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Your listing for <strong className="text-amber-400">{effectiveBrand} {model}</strong> has been received with appraisal reference{' '}
            <code className="text-emerald-400 font-mono font-bold bg-slate-900 px-2 py-0.5 rounded">
              CLAW-APP-{Math.floor(100000 + Math.random() * 900000)}
            </code>.
          </p>
          <p className="text-xs text-slate-400">
            A confirmation link and technician dispatch schedule have been routed to <strong className="text-white">{ownerEmail || 'your email'}</strong>.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs apple-press shadow"
          >
            List Another Piece of Equipment
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (7 cols) */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl apple-glass-card border border-slate-800 space-y-6"
          >
            <h2 className="text-lg font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-500" />
              Equipment Intake Form
            </h2>

            {/* Category */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Equipment Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'STRENGTH', label: 'Strength/Racks' },
                  { id: 'CARDIO', label: 'Cardio/Ergs' },
                  { id: 'FREE_WEIGHTS', label: 'Free Weights' },
                  { id: 'ACCESSORIES', label: 'Accessories' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id as EquipmentCategory)}
                    data-testid={`sell-category-${cat.id}`}
                    className={`py-2 px-3 rounded-xl text-xs font-medium apple-press border text-center ${
                      category === cat.id
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-500'
                        : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand & Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Brand / Manufacturer
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  data-testid="sell-brand-select"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {COMMON_BRANDS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                  <option value="OTHER">Other / Custom</option>
                </select>
              </div>

              {brand === 'OTHER' ? (
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Custom Brand Name
                  </label>
                  <input
                    type="text"
                    value={customBrand}
                    onChange={(e) => setCustomBrand(e.target.value)}
                    placeholder="e.g., Sorinex, Hammer Strength"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Model or Specification
                  </label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    data-testid="sell-model-input"
                    placeholder="e.g. RowErg PM5, Monster Lite R-3"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              )}
            </div>

            {/* Condition & Purchase Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Condition Rating
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as EquipmentCondition)}
                  data-testid="sell-condition-select"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="NEW">Brand New / Factory Sealed</option>
                  <option value="CERTIFIED_REFURBISHED">Refurbished with OEM Parts</option>
                  <option value="USED_LIKE_NEW">Pre-Owned: Like New (Flawless)</option>
                  <option value="USED_GOOD">Pre-Owned: Good (Minor Blemishes)</option>
                  <option value="USED_FAIR">Pre-Owned: Fair (Cosmetic Scuffs)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Year of Original Purchase
                </label>
                <select
                  value={yearPurchased}
                  onChange={(e) => setYearPurchased(Number(e.target.value))}
                  data-testid="sell-year-select"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* MSRP & Target Asking Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Original Retail Price (MSRP $)
                </label>
                <input
                  type="number"
                  min={50}
                  step={25}
                  value={originalMsrp}
                  onChange={(e) => setOriginalMsrp(Number(e.target.value))}
                  data-testid="sell-msrp-input"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Your Target Asking Price ($)
                </label>
                <input
                  type="number"
                  min={20}
                  step={25}
                  value={userAskingPrice}
                  onChange={(e) => setUserAskingPrice(Number(e.target.value))}
                  data-testid="sell-asking-input"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            {/* Inspection & Pickup Preference */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Logistics & Verification Option
              </label>
              <div className="space-y-2 text-xs">
                {[
                  {
                    id: 'CLAW_MOBILE',
                    title: 'Claw Mobile Van Inspection (Recommended)',
                    desc: 'A certified technician visits your location, tests equipment, takes photos, and issues certificate.',
                  },
                  {
                    id: 'FREIGHT_PICKUP',
                    title: 'Pre-Packaged Freight Carrier Pickup',
                    desc: 'We dispatch a freight carrier with pallet and strapping materials.',
                  },
                  {
                    id: 'LOCAL_DEPOT',
                    title: 'Self Drop-Off at Regional Claw Depot',
                    desc: 'Bring equipment directly to an authorized distribution hub for instant verification.',
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setInspectionPref(opt.id as any)}
                    className={`w-full text-left p-3 rounded-2xl border apple-press transition-colors ${
                      inspectionPref === opt.id
                        ? 'bg-amber-500/15 border-amber-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="font-bold text-white block">{opt.title}</span>
                    <span className="text-[11px] text-slate-400 mt-0.5 block">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Contact Email
                </label>
                <input
                  type="email"
                  placeholder="seller@example.com"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  data-testid="sell-email-input"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Equipment Location (ZIP Code)
                </label>
                <input
                  type="text"
                  placeholder="78701"
                  value={ownerZip}
                  onChange={(e) => setOwnerZip(e.target.value)}
                  data-testid="sell-zip-input"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              data-testid="btn-submit-sell-listing"
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm apple-press shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
              Submit Equipment for Appraisal
            </button>
          </form>

          {/* Right Live Valuation Gauge (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div
              data-testid="valuation-card"
              className="p-6 rounded-3xl apple-glass border border-amber-500/30 space-y-5 sticky top-24 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-bold text-white">Live Valuation Engine</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {valuation.marketDemandIndex} Demand
                </span>
              </div>

              {/* Recommended List Price */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Recommended Marketplace List Price</span>
                <div className="text-3xl font-black text-white tracking-tight">
                  ${valuation.suggestedListPrice.toLocaleString()}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Target Range:</span>
                  <span className="font-semibold text-amber-400">
                    ${valuation.priceRangeMin.toLocaleString()} – ${valuation.priceRangeMax.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Instant Cash Buyout Option */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 to-orange-500/5 border border-amber-500/40 space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-amber-300">Instant Claw Cash Buyout</span>
                </div>
                <div className="text-2xl font-black text-white">
                  ${valuation.instantCashOffer.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Skip waiting for buyers. We wire funds immediately upon technician physical verification and handle transport.
                </p>
              </div>

              {/* Market Metrics */}
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Est. Days on Market:
                  </span>
                  <span className="font-bold text-white">~{valuation.turnaroundDaysAvg} days</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                    Similar Units Sold (Last 90d):
                  </span>
                  <span className="font-bold text-white">{valuation.comparableSoldUnitsCount} verified sales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
