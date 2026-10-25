import React, { useState, useMemo } from 'react';
import { EquipmentItem, CatalogFilterState } from '../types/equipment';
import { MOCK_EQUIPMENT } from '../data/mockEquipment';
import { EquipmentCard } from './EquipmentCard';
import { FilterSidebar } from './FilterSidebar';
import { Search, Sparkles, Tag, ShieldCheck, ArrowDownUp } from 'lucide-react';

interface CatalogProps {
  items?: EquipmentItem[];
  onSelectItem: (item: EquipmentItem) => void;
  onNavigateSell: () => void;
  onNavigateSpace: () => void;
}

const INITIAL_FILTERS: CatalogFilterState = {
  searchQuery: '',
  category: 'ALL',
  condition: 'ALL',
  minPrice: 0,
  maxPrice: 5000,
  brand: 'ALL',
  sortBy: 'featured',
};

export const Catalog: React.FC<CatalogProps> = ({
  items = MOCK_EQUIPMENT,
  onSelectItem,
  onNavigateSell,
  onNavigateSpace,
}) => {
  const [filters, setFilters] = useState<CatalogFilterState>(INITIAL_FILTERS);

  // Extract unique brands from active dataset
  const brands = useMemo(() => {
    return Array.from(new Set(items.map((i) => i.brand))).sort();
  }, [items]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesModel = item.model.toLowerCase().includes(query);
        if (!matchesTitle && !matchesBrand && !matchesModel) return false;
      }

      // Category
      if (filters.category !== 'ALL' && item.category !== filters.category) {
        return false;
      }

      // Condition
      if (filters.condition === 'ALL_NEW' && item.condition !== 'NEW') {
        return false;
      }
      if (filters.condition === 'ALL_USED' && item.condition === 'NEW') {
        return false;
      }
      if (filters.condition === 'CERTIFIED_REFURBISHED' && item.condition !== 'CERTIFIED_REFURBISHED') {
        return false;
      }

      // Brand
      if (filters.brand !== 'ALL' && item.brand !== filters.brand) {
        return false;
      }

      // Price ($5,000 slider top represents "$5,000+" unbounded ceiling)
      if (filters.maxPrice < 5000 && item.price > filters.maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'savings_desc') return b.savingsPercentage - a.savingsPercentage;
      if (filters.sortBy === 'newest') return b.yearManufactured - a.yearManufactured;
      // Default: featured
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [items, filters]);

  const newCount = filteredItems.filter((i) => i.condition === 'NEW').length;
  const usedCount = filteredItems.filter((i) => i.condition !== 'NEW').length;

  const handleFilterChange = (updated: Partial<CatalogFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <div className="space-y-8">
      {/* Hero Showcase Banner */}
      <section className="relative rounded-3xl overflow-hidden apple-glass p-8 md:p-12 border border-slate-800 shadow-2xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Verified Commercial & Home Gym Marketplace
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Buy, Sell & Showcase <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
              New & Certified Used
            </span>{' '}
            Gym Equipment
          </h1>
          <p className="mt-4 text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl">
            Save up to 55% on pre-owned commercial racks, ergs, and barbells backed by our 8-Point Physical Inspection. Or list your gym gear with instant algorithmic valuation.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateSell}
              data-testid="hero-btn-sell"
              className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs md:text-sm apple-press shadow-lg flex items-center gap-2"
            >
              <Tag className="w-4 h-4" />
              Sell Your Equipment
            </button>
            <button
              onClick={onNavigateSpace}
              data-testid="hero-btn-space"
              className="px-5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-xs md:text-sm border border-slate-700/80 apple-press"
            >
              Check Room & Ceiling Clearance
            </button>
          </div>
        </div>
      </section>

      {/* Main Search & Sort Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by brand, model, barbell, rack, rower, bench..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange({ searchQuery: e.target.value })}
            data-testid="input-catalog-search"
            className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
          />
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <ArrowDownUp className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange({ sortBy: e.target.value as CatalogFilterState['sortBy'] })}
            data-testid="select-catalog-sort"
            className="bg-slate-900 border border-slate-800 text-xs text-slate-200 font-medium rounded-xl px-3 py-3 focus:outline-none focus:border-amber-500"
          >
            <option value="featured">Featured First</option>
            <option value="savings_desc">Biggest Discount %</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest Manufactured Year</option>
          </select>
        </div>
      </div>

      {/* Result Count and Quick Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 px-1 tabular-nums">
        <div className="flex items-center gap-2">
          <span data-testid="results-count" className="font-semibold text-slate-200">
            {filteredItems.length} {filteredItems.length === 1 ? 'Equipment Listing' : 'Equipment Listings'} Found
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-medium">{newCount} Brand New</span>
          <span className="text-slate-600">·</span>
          <span className="text-amber-400 font-medium">{usedCount} Pre-Owned/Refurbished</span>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[11px] text-slate-400">All pre-owned items pass certified technician diagnostics</span>
        </div>
      </div>

      {/* Main Grid + Sidebar Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <FilterSidebar
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
          brands={brands}
        />

        {/* Catalog Grid */}
        <div className="flex-1 w-full min-w-0">
          {filteredItems.length === 0 ? (
            <div
              data-testid="catalog-empty-state"
              className="p-12 text-center rounded-3xl apple-glass-card border border-slate-800/80 my-8"
            >
              <h3 className="text-lg font-bold text-white">No gym equipment matches your criteria</h3>
              <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
                Try widening your price range, clearing brand filters, or switching condition tiers.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold apple-press shadow"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              data-testid="catalog-grid"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredItems.map((item) => (
                <EquipmentCard
                  key={item.id}
                  item={item}
                  onSelect={onSelectItem}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
