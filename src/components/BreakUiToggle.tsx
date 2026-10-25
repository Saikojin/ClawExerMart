import React from 'react';
import { DatasetMode } from '../data/mockEquipment';
import { Bug } from 'lucide-react';

interface BreakUiToggleProps {
  mode: DatasetMode;
  onChange: (mode: DatasetMode) => void;
}

const MODES: { id: DatasetMode; label: string }[] = [
  { id: 'demo', label: 'Demo data' },
  { id: 'worst', label: 'Worst case' },
  { id: 'single', label: '1 item' },
  { id: 'empty', label: 'Empty' },
];

export const BreakUiToggle: React.FC<BreakUiToggleProps> = ({ mode, onChange }) => {
  return (
    <div
      data-testid="break-ui-toggle"
      role="region"
      aria-label="SeikoClaw break-ui dataset switcher"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-900/95 border border-slate-700/90 shadow-2xl backdrop-blur-md text-[11px] font-sans select-none"
    >
      <span className="flex items-center gap-1 px-2 text-slate-400 font-semibold tracking-tight">
        <Bug className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
        <span className="hidden sm:inline">break-ui:</span>
      </span>

      <div className="flex items-center gap-1 bg-slate-950/90 p-0.5 rounded-full border border-slate-800">
        {MODES.map((opt) => {
          const active = mode === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              data-testid={`break-ui-mode-${opt.id}`}
              className={`px-2.5 py-1 rounded-full font-medium transition-none whitespace-nowrap ${
                active
                  ? 'bg-white text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
