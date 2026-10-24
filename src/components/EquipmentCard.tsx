import React from 'react';
import { EquipmentItem } from '../types/equipment';
import { ConditionBadge, ScoreBadge } from './Badge';
import { MapPin, ArrowUpRight, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface EquipmentCardProps {
  item: EquipmentItem;
  onSelect: (item: EquipmentItem) => void;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({ item, onSelect }) => {
  const { addItem } = useCart();
  const isUsed = item.condition !== 'NEW';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(item);
  };

  return (
    <article
      data-testid={`equipment-card-${item.id}`}
      onClick={() => onSelect(item)}
      className="group relative rounded-3xl apple-glass-card overflow-hidden flex flex-col transition-all duration-200 hover:border-slate-700 hover:shadow-2xl cursor-pointer select-none"
    >
      {/* Top Media Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
        <img
          src={item.images[0]}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
        />

        {/* Condition Badge in top-left */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
          <ConditionBadge condition={item.condition} />
          {isUsed && item.savingsPercentage > 0 && (
            <span
              data-testid="badge-savings"
              className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-sm"
            >
              Save {item.savingsPercentage}%
            </span>
          )}
        </div>

        {/* Inspection Score in top-right */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <ScoreBadge score={item.inspectionScore} />
        </div>

        {/* Freight indicator banner on image bottom */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-slate-200 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10">
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            {item.deliveryOptions.freightCurbsidePrice === 0
              ? 'Free Shipping'
              : `Freight from $${item.deliveryOptions.freightCurbsidePrice}`}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <MapPin className="w-3 h-3" />
            {item.location.city}, {item.location.state}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-500">
            {item.brand} · {item.category.replace('_', ' ')}
          </div>
          <h3 className="text-base font-bold text-white mt-1 group-hover:text-amber-400 transition-colors line-clamp-1">
            {item.title}
          </h3>

          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Specs Pill List */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>{item.dimensions.heightInches}"H Clearance</span>
          <span>{item.dimensions.weightLbs} lbs solid</span>
          <span>{item.yearManufactured}</span>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-white tracking-tight">
                ${item.price.toLocaleString()}
              </span>
              {isUsed && item.originalMsrp > item.price && (
                <span className="text-xs text-slate-500 line-through">
                  ${item.originalMsrp.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-500 block">
              {isUsed ? 'Certified Pre-Owned' : 'Brand New Direct'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickAdd}
              data-testid={`btn-quick-add-${item.id}`}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white apple-press border border-slate-700/60"
              title="Add to Cart"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>

            <button
              data-testid={`btn-view-${item.id}`}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 apple-press shadow-sm"
            >
              Details
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
