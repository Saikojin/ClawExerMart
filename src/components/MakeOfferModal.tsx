import React, { useState } from 'react';
import { EquipmentItem } from '../types/equipment';
import { useCart } from '../context/CartContext';
import { X, DollarSign, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface MakeOfferModalProps {
  item: EquipmentItem;
  isOpen: boolean;
  onClose: () => void;
}

export const MakeOfferModal: React.FC<MakeOfferModalProps> = ({ item, isOpen, onClose }) => {
  const { submitOffer } = useCart();
  const [offerAmount, setOfferAmount] = useState<number>(Math.round(item.price * 0.88));
  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const percentageOfAsking = Math.round((offerAmount / item.price) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address to receive seller response.');
      return;
    }

    if (offerAmount <= 0) {
      setError('Offer amount must be greater than $0.');
      return;
    }

    if (offerAmount < item.price * 0.5) {
      setError('Offers below 50% of asking price are rejected automatically by seller settings.');
      return;
    }

    if (offerAmount > item.price) {
      setError('Offer cannot exceed the current Buy Now asking price.');
      return;
    }

    setError('');
    submitOffer(item, offerAmount, email);
    setIsSubmitted(true);
  };

  return (
    <div
      data-testid="make-offer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl apple-glass p-6 border border-slate-700/80 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          data-testid="btn-close-offer-modal"
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white apple-press"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4" data-testid="offer-success-state">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Counter-Offer Submitted!</h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
              Your offer of <strong className="text-white">${offerAmount.toLocaleString()}</strong> for{' '}
              <strong className="text-amber-400">{item.title}</strong> has been transmitted to{' '}
              <span className="text-white font-medium">{item.seller.name}</span>.
            </p>
            <p className="text-[11px] text-slate-500">
              The seller has 24 hours to accept, decline, or issue a counter. We sent confirmation to{' '}
              <span className="text-slate-300 underline">{email}</span>.
            </p>
            <button
              onClick={onClose}
              data-testid="btn-done-offer"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs apple-press shadow"
            >
              Back to Equipment
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                Direct Seller Negotiation
              </span>
              <h3 className="text-lg font-black text-white tracking-tight mt-0.5">
                Make an Offer on Pre-Owned Gear
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">{item.title}</p>
            </div>

            {/* Price Comparison Block */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Current Asking Price</span>
                <span className="text-base font-bold text-white">${item.price.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[11px]">Seller</span>
                <span className="text-xs font-semibold text-amber-400">{item.seller.name}</span>
              </div>
            </div>

            {/* Offer Amount Input */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Your Offer Amount ($ USD)
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(Number(e.target.value))}
                  data-testid="input-offer-amount"
                  min={1}
                  max={item.price}
                  step={10}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-base font-bold text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Dynamic feedback on offer strength */}
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">
                  {percentageOfAsking}% of asking price
                </span>
                <span
                  className={`font-semibold ${
                    percentageOfAsking >= 85
                      ? 'text-emerald-400'
                      : percentageOfAsking >= 70
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}
                >
                  {percentageOfAsking >= 85
                    ? 'Strong Offer (High acceptance rate)'
                    : percentageOfAsking >= 70
                    ? 'Reasonable Counter'
                    : 'Low-ball Risk'}
                </span>
              </div>
            </div>

            {/* Contact Email */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Your Contact Email
              </label>
              <input
                type="email"
                placeholder="athlete@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="input-offer-email"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {error && (
              <div
                data-testid="offer-error-message"
                className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              data-testid="btn-submit-offer"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs apple-press shadow flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Offer to Seller
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
