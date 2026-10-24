import React from 'react';
import { CatalogFilterState, EquipmentCategory } from '../types/equipment';
import { Filter, RotateCcw, Sparkles } from 'lucide-react';

interface FilterSidebarProps {
  filters: CatalogFilterState;
  onChange: (updated: Partial<CatalogFilterState>) => void;
  onReset: () => void;
  brands: string[];
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  brands,
}) => {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
      <div className="p-5 rounded-3xl apple-glass-card space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Filter className="w-4 h-4 text-amber-500" />
            <span>Filter Gear</span>
          </div>

          <button
            onClick={onReset}
            data-testid="btn-reset-filters"
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-400 apple-press"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Condition Filter */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-2.5">
            Equipment Condition
          </label>
          <div className="space-y-1.5" data-testid="filter-condition-group">
            {[
              { id: 'ALL', label: 'All Equipment' },
              { id: 'ALL_NEW', label: 'Brand New (Factory Sealed)' },
              { id: 'ALL_USED', label: 'Pre-Owned & Refurbished' },
              { id: 'CERTIFIED_REFURBISHED', label: 'Certified Refurbished Only' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => onChange({ condition: opt.id as CatalogFilterState['condition'] })}
                data-testid={`filter-condition-${opt.id}`}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium apple-press transition-colors flex items-center justify-between ${
                  filters.condition === opt.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <span>{opt.label}</span>
                {filters.condition === opt.id && <Sparkles className="w-3 h-3 text-slate-950" />}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-2.5">
            Category
          </label>
          <div className="space-y-1.5" data-testid="filter-category-group">
            {[
              { id: 'ALL', label: 'All Categories' },
              { id: 'STRENGTH', label: 'Strength & Racks' },
              { id: 'CARDIO', label: 'Cardio & Rowers' },
              { id: 'FREE_WEIGHTS', label: 'Free Weights & Dumbbells' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => onChange({ category: opt.id as EquipmentCategory | 'ALL' })}
                data-testid={`filter-category-${opt.id}`}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium apple-press transition-colors ${
                  filters.category === opt.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            Manufacturer / Brand
          </label>
          <select
            value={filters.brand}
            onChange={(e) => onChange({ brand: e.target.value })}
            data-testid="filter-brand-select"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          >
            <option value="ALL">All Manufacturers</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Max Price Filter */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
            <span>Max Price</span>
            <span className="text-amber-400 font-bold">${filters.maxPrice.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={200}
            max={5000}
            step={50}
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
            data-testid="filter-price-slider"
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>$200</span>
            <span>$5,000+</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
