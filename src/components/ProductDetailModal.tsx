import React, { useState } from 'react';
import { EquipmentItem } from '../types/equipment';
import { ConditionBadge, ScoreBadge } from './Badge';
import { InspectionChecklist } from './InspectionChecklist';
import { MakeOfferModal } from './MakeOfferModal';
import { useCart, DeliveryTier } from '../context/CartContext';
import {
  X,
  ShoppingBag,
  Shield,
  Ruler,
  MapPin,
  Check,
  Tag,
  Award,
} from 'lucide-react';

interface ProductDetailModalProps {
  item: EquipmentItem | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ item, onClose }) => {
  const { addItem } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedTier, setSelectedTier] = useState<DeliveryTier>('FREIGHT_CURBSIDE');
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  if (!item) return null;

  const isUsed = item.condition !== 'NEW';

  const handleAddToCart = () => {
    addItem(item, selectedTier);
    onClose();
  };

  return (
    <>
      <div
        data-testid="product-detail-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-4xl my-auto rounded-3xl apple-glass border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
            <div className="flex items-center gap-2">
              <ConditionBadge condition={item.condition} />
              <ScoreBadge score={item.inspectionScore} />
              {isUsed && (
                <span className="text-[11px] font-bold text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Save {item.savingsPercentage}% vs MSRP
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              data-testid="btn-close-detail-modal"
              className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white apple-press"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body Content */}
          <div className="overflow-y-auto p-6 space-y-6">
            {/* Top Grid: Gallery & Buying Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Media Gallery (7 cols) */}
              <div className="lg:col-span-7 space-y-3">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                  <img
                    src={item.images[selectedImageIndex] || item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {item.images.length > 1 && (
                  <div className="flex gap-2">
                    {item.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                          selectedImageIndex === idx
                            ? 'border-amber-500 scale-95 shadow'
                            : 'border-slate-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Location & Seller Summary */}
                <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <div>
                      <span className="text-white font-medium">
                        {item.location.city}, {item.location.state} {item.location.zip}
                      </span>
                      <p className="text-[11px] text-slate-400">
                        {item.location.distanceMiles ? `~${item.location.distanceMiles} miles from your location` : 'Verified Freight Hub'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Seller</span>
                    <span className="text-xs font-semibold text-amber-400 flex items-center gap-1 justify-end">
                      <Award className="w-3.5 h-3.5" />
                      {item.seller.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Buying Box & Price (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-500">
                    {item.brand} · {item.model}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1 leading-snug">
                    {item.title}
                  </h2>

                  {/* Price Block */}
                  <div className="mt-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl font-black text-white">
                        ${item.price.toLocaleString()}
                      </span>
                      {isUsed && item.originalMsrp > item.price && (
                        <span className="text-sm text-slate-500 line-through">
                          ${item.originalMsrp.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {isUsed && (
                      <p className="text-xs text-emerald-400 font-semibold">
                        Instant ${ (item.originalMsrp - item.price).toLocaleString() } Savings vs New MSRP
                      </p>
                    )}
                  </div>

                  {/* Delivery Selection */}
                  <div className="mt-5 space-y-2">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Choose Delivery Method
                    </label>

                    <div className="space-y-1.5 text-xs">
                      {item.deliveryOptions.localPickup && (
                        <button
                          type="button"
                          onClick={() => setSelectedTier('LOCAL_PICKUP')}
                          data-testid="delivery-tier-pickup"
                          className={`w-full p-2.5 rounded-xl border flex items-center justify-between apple-press ${
                            selectedTier === 'LOCAL_PICKUP'
                              ? 'bg-amber-500/15 border-amber-500 text-white font-semibold'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <Check className={`w-3.5 h-3.5 ${selectedTier === 'LOCAL_PICKUP' ? 'text-amber-400' : 'opacity-0'}`} />
                            Local Warehouse Pickup
                          </span>
                          <span className="text-emerald-400 font-bold">FREE</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setSelectedTier('FREIGHT_CURBSIDE')}
                        data-testid="delivery-tier-freight"
                        className={`w-full p-2.5 rounded-xl border flex items-center justify-between apple-press ${
                          selectedTier === 'FREIGHT_CURBSIDE'
                            ? 'bg-amber-500/15 border-amber-500 text-white font-semibold'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Check className={`w-3.5 h-3.5 ${selectedTier === 'FREIGHT_CURBSIDE' ? 'text-amber-400' : 'opacity-0'}`} />
                          Freight Curbside (Hydraulic Liftgate)
                        </span>
                        <span className="text-white font-bold">
                          {item.deliveryOptions.freightCurbsidePrice === 0
                            ? 'FREE'
                            : `$${item.deliveryOptions.freightCurbsidePrice}`}
                        </span>
                      </button>

                      {item.deliveryOptions.whiteGloveAssemblyAvailable && (
                        <button
                          type="button"
                          onClick={() => setSelectedTier('WHITE_GLOVE')}
                          data-testid="delivery-tier-whiteglove"
                          className={`w-full p-2.5 rounded-xl border flex items-center justify-between apple-press ${
                            selectedTier === 'WHITE_GLOVE'
                              ? 'bg-amber-500/15 border-amber-500 text-white font-semibold'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <Check className={`w-3.5 h-3.5 ${selectedTier === 'WHITE_GLOVE' ? 'text-amber-400' : 'opacity-0'}`} />
                            White Glove Assembly & Room of Choice
                          </span>
                          <span className="text-white font-bold">
                            ${item.deliveryOptions.whiteGlovePrice}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="space-y-2.5 pt-4">
                  <button
                    onClick={handleAddToCart}
                    data-testid="btn-modal-add-to-cart"
                    className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm apple-press shadow-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                    Add to Cart · ${item.price.toLocaleString()}
                  </button>

                  {isUsed && (
                    <button
                      onClick={() => setIsOfferModalOpen(true)}
                      data-testid="btn-modal-make-offer"
                      className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs border border-amber-500/30 apple-press flex items-center justify-center gap-1.5"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      Make an Offer to Seller
                    </button>
                  )}

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.warranty}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspection Sheet Accordion */}
            <div className="pt-4 border-t border-slate-800">
              <InspectionChecklist
                report={item.inspectionReport}
                score={item.inspectionScore}
                condition={item.condition}
              />
            </div>

            {/* Specifications & Dimensions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              {/* Dimensions */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                  <Ruler className="w-4 h-4 text-amber-400" />
                  <span>Dimensions & Footprint</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Length x Width</span>
                    <span className="font-semibold text-white">
                      {item.dimensions.lengthInches}" x {item.dimensions.widthInches}"
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Unit Height</span>
                    <span className="font-semibold text-white">{item.dimensions.heightInches}"</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Total Unit Weight</span>
                    <span className="font-semibold text-white">{item.dimensions.weightLbs} lbs</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <span className="text-[11px] text-amber-400 block font-semibold">Min Ceiling Clearance</span>
                    <span className="font-bold text-white">{item.ceilingClearanceRequiredInches}" minimum</span>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>Build & Materials Specs</span>
                </div>
                <dl className="divide-y divide-slate-800 text-xs">
                  {Object.entries(item.specs).map(([key, value]) => (
                    <div key={key} className="py-2 flex justify-between gap-4">
                      <dt className="text-slate-400 font-medium">{key}</dt>
                      <dd className="text-white font-semibold text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Modal: Make an Offer */}
      <MakeOfferModal
        item={item}
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
      />
    </>
  );
};
