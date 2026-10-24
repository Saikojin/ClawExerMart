import React from 'react';
import { ShieldCheck, Truck, RotateCcw, ExternalLink, GitBranch } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 mt-20 text-slate-400">
      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-900/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Certified 8-Point Inspection</h4>
              <p className="text-xs text-slate-400 mt-0.5">Every pre-owned rack, cable, and motor rigorously stress-tested.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Insured Freight & White Glove</h4>
              <p className="text-xs text-slate-400 mt-0.5">Hydraulic liftgate delivery directly to your garage, basement, or curb.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">30-Day Ironclad Guarantee</h4>
              <p className="text-xs text-slate-400 mt-0.5">Mechanical condition guaranteed as described or 100% full refund.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-base font-bold text-white tracking-tight">ClawExerMart Fitness Systems</span>
            <p className="text-xs text-slate-500 mt-1">
              Engineered with React 18, Vite, TypeScript & Tailwind CSS. Zero PHP vulnerability footprint.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <a
              href="https://medium.com/@michael.leonard/story-test-plan-template-a4202531e741"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              Story Test Plan Reference
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://github.com/Saikojin/ClawExerMart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5" />
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
