import React from 'react';
import { ShoppingBag, Dumbbell, ShieldCheck, Ruler, DollarSign, Layers } from 'lucide-react';
import { useCart } from '../context/CartContext';

export type NavTab = 'catalog' | 'sell' | 'space-matcher' | 'story-qa';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full apple-glass transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => onTabChange('catalog')}
            className="flex items-center gap-3 cursor-pointer select-none group"
            data-testid="nav-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 shadow-md group-hover:scale-105 transition-transform duration-200">
              <Dumbbell className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                ClawExerMart
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Certified
                </span>
              </span>
              <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">
                New & Pre-Owned Fitness Exchange
              </p>
            </div>
          </div>

          {/* Navigation Links (Apple pill style) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-slate-800/80 shadow-inner">
            <button
              onClick={() => onTabChange('catalog')}
              data-testid="tab-catalog"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium apple-press transition-colors ${
                activeTab === 'catalog'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Browse Gear
            </button>

            <button
              onClick={() => onTabChange('sell')}
              data-testid="tab-sell"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium apple-press transition-colors ${
                activeTab === 'sell'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              Sell Your Gear
            </button>

            <button
              onClick={() => onTabChange('space-matcher')}
              data-testid="tab-space-matcher"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium apple-press transition-colors ${
                activeTab === 'space-matcher'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Ruler className="w-3.5 h-3.5" />
              Space Planner
            </button>

            <button
              onClick={() => onTabChange('story-qa')}
              data-testid="tab-story-qa"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium apple-press transition-colors ${
                activeTab === 'story-qa'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              QA Story & Test Plan
            </button>
          </nav>

          {/* Cart & Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              data-testid="nav-cart-btn"
              className="relative p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white apple-press"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span
                  data-testid="cart-badge-count"
                  className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow"
                >
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-2 border-t border-slate-800/60 no-scrollbar">
          <button
            onClick={() => onTabChange('catalog')}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              activeTab === 'catalog'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-900 text-slate-300'
            }`}
          >
            Browse
          </button>
          <button
            onClick={() => onTabChange('sell')}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              activeTab === 'sell'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-900 text-slate-300'
            }`}
          >
            Sell Gear
          </button>
          <button
            onClick={() => onTabChange('space-matcher')}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              activeTab === 'space-matcher'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-900 text-slate-300'
            }`}
          >
            Space Planner
          </button>
          <button
            onClick={() => onTabChange('story-qa')}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              activeTab === 'story-qa'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-900 text-slate-300'
            }`}
          >
            QA Story
          </button>
        </div>
      </div>
    </header>
  );
};
