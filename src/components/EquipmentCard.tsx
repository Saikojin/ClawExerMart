import React, { useState } from 'react';
import { EquipmentItem } from '../types/equipment';
import { ConditionBadge, ScoreBadge } from './Badge';
import { MapPin, ArrowUpRight, ShoppingBag, Truck, Dumbbell } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface EquipmentCardProps {
  item: EquipmentItem;
  onSelect: (item: EquipmentItem) => void;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({ item, onSelect }) => {
  const { addItem } = useCart();
  const [imgError, setImgError] = useState(false);
  const isUsed = item.condition !== 'NEW';
  const primaryImage = item.images && item.images.length > 0 ? item.images[0] : '';

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
        {!imgError && primaryImage ? (
          <img
            src={primaryImage}
            alt={item.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        ) : (
          <div
            data-testid={`img-fallback-${item.id}`}
            className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-500 p-4 text-center"
          >
            <Dumbbell className="w-8 h-8 text-amber-500/60 mb-1.5 flex-shrink-0" />
            <span className="text-[11px] font-medium text-slate-400">
              Verified Equipment Photo Pending
            </span>
          </div>
        )}

        {/* Top-left stacked badges (flex-col prevents horizontal collision with top-right score badge) */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5 z-10 max-w-[58%]">
          <ConditionBadge condition={item.condition} />
          {isUsed && item.savingsPercentage > 0 && (
            <span
              data-testid="badge-savings"
              className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-sm whitespace-nowrap flex-shrink-0"
            >
              Save {item.savingsPercentage}%
            </span>
          )}
        </div>

        {/* Inspection Score in top-right */}
        <div className="absolute top-3 right-3 z-10 flex-shrink-0">
          <ScoreBadge score={item.inspectionScore} />
        </div>

        {/* Freight indicator banner on image bottom */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between gap-2 text-[11px] text-slate-200 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10">
          <span className="flex items-center gap-1 flex-shrink-0 whitespace-nowrap tabular-nums">
            <Truck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            {item.deliveryOptions.freightCurbsidePrice === 0
              ? 'Free Shipping'
              : `Freight $${item.deliveryOptions.freightCurbsidePrice.toLocaleString()}`}
          </span>
          <span
            title={`${item.location.city}, ${item.location.state}`}
            className="flex items-center gap-1 text-slate-300 min-w-0 truncate"
          >
            <MapPin className="w-3 h-3 flex-shrink-0 text-slate-400" />
            <span className="truncate">
              {item.location.city}, {item.location.state}
            </span>
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="min-w-0">
          <div
            title={`${item.brand} · ${item.category.replace('_', ' ')}`}
            className="text-[11px] font-semibold uppercase tracking-wider text-amber-500 truncate"
          >
            {item.brand} · {item.category.replace('_', ' ')}
          </div>
          <h3
            title={item.title}
            className="text-base font-bold text-white mt-1 group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug"
          >
            {item.title}
          </h3>

          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Specs Pill List */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[11px] text-slate-400 tabular-nums">
          <span className="truncate">{item.dimensions.heightInches}"H Clearance</span>
          <span className="truncate">{item.dimensions.weightLbs.toLocaleString()} lbs solid</span>
          <span className="flex-shrink-0">{item.yearManufactured}</span>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5 flex-wrap tabular-nums">
              <span className="text-xl font-extrabold text-white tracking-tight whitespace-nowrap">
                ${item.price.toLocaleString()}
              </span>
              {isUsed && item.originalMsrp > item.price && (
                <span className="text-xs text-slate-500 line-through whitespace-nowrap">
                  ${item.originalMsrp.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-500 block truncate">
              {isUsed ? 'Certified Pre-Owned' : 'Brand New Direct'}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleQuickAdd}
              data-testid={`btn-quick-add-${item.id}`}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white apple-press border border-slate-700/60 flex-shrink-0"
              title="Add to Cart"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>

            <button
              data-testid={`btn-view-${item.id}`}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 apple-press shadow-sm flex-shrink-0 whitespace-nowrap"
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
