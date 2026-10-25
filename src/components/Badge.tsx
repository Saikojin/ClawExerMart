import React from 'react';
import { EquipmentCondition } from '../types/equipment';

interface ConditionBadgeProps {
  condition: EquipmentCondition;
  className?: string;
}

export const ConditionBadge: React.FC<ConditionBadgeProps> = ({ condition, className = '' }) => {
  switch (condition) {
    case 'NEW':
      return (
        <span
          data-testid="badge-condition-new"
          className={`inline-flex items-center whitespace-nowrap flex-shrink-0 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 backdrop-blur-md shadow-sm ${className}`}
        >
          ● Brand New
        </span>
      );
    case 'CERTIFIED_REFURBISHED':
      return (
        <span
          data-testid="badge-condition-refurbished"
          className={`inline-flex items-center whitespace-nowrap flex-shrink-0 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/35 backdrop-blur-md shadow-sm ${className}`}
        >
          ★ Certified Refurbished
        </span>
      );
    case 'USED_LIKE_NEW':
      return (
        <span
          data-testid="badge-condition-like-new"
          className={`inline-flex items-center whitespace-nowrap flex-shrink-0 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/35 backdrop-blur-md shadow-sm ${className}`}
        >
          Pre-Owned · Like New
        </span>
      );
    case 'USED_GOOD':
      return (
        <span
          data-testid="badge-condition-good"
          className={`inline-flex items-center whitespace-nowrap flex-shrink-0 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/35 backdrop-blur-md shadow-sm ${className}`}
        >
          Pre-Owned · Good
        </span>
      );
    case 'USED_FAIR':
      return (
        <span
          data-testid="badge-condition-fair"
          className={`inline-flex items-center whitespace-nowrap flex-shrink-0 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-500/25 text-stone-200 border border-stone-500/40 backdrop-blur-md shadow-sm ${className}`}
        >
          Pre-Owned · Fair
        </span>
      );
    default:
      return null;
  }
};

export const ScoreBadge: React.FC<{ score: number; className?: string }> = ({ score, className = '' }) => {
  const isPerfect = score === 100;
  const isHigh = score >= 90;

  return (
    <span
      data-testid="badge-inspection-score"
      className={`inline-flex items-center whitespace-nowrap flex-shrink-0 gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-md shadow-sm ${
        isPerfect
          ? 'bg-emerald-950/75 text-emerald-300 border-emerald-500/40'
          : isHigh
          ? 'bg-amber-950/75 text-amber-300 border-amber-500/40'
          : 'bg-slate-900/85 text-slate-200 border-slate-700'
      } ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"></span>
      <span className="tabular-nums">{score}/100</span> Inspected
    </span>
  );
};
