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
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 ${className}`}
        >
          ● Brand New
        </span>
      );
    case 'CERTIFIED_REFURBISHED':
      return (
        <span
          data-testid="badge-condition-refurbished"
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 ${className}`}
        >
          ★ Certified Refurbished
        </span>
      );
    case 'USED_LIKE_NEW':
      return (
        <span
          data-testid="badge-condition-like-new"
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30 ${className}`}
        >
          Pre-Owned · Like New
        </span>
      );
    case 'USED_GOOD':
      return (
        <span
          data-testid="badge-condition-good"
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 ${className}`}
        >
          Pre-Owned · Good
        </span>
      );
    case 'USED_FAIR':
      return (
        <span
          data-testid="badge-condition-fair"
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-500/20 text-stone-300 border border-stone-500/40 ${className}`}
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
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
        isPerfect
          ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
          : isHigh
          ? 'bg-amber-950/40 text-amber-300 border-amber-500/30'
          : 'bg-slate-800 text-slate-300 border-slate-700'
      } ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {score}/100 Inspected
    </span>
  );
};
