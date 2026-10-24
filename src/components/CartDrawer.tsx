import React, { useState } from 'react';
import { useCart, DeliveryTier } from '../context/CartContext';
import { ConditionBadge } from './Badge';
import {
  X,
  Trash2,
  Truck,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  CreditCard,
  ArrowRight,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateDeliveryTier,
    clearCart,
    subtotal,
    totalFreight,
    estimatedTax,
    grandTotal,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isCartOpen) return null;

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderConfirmed(true);
    }, 700);
  };

  const handleFinishOrder = () => {
    setOrderConfirmed(false);
    clearCart();
    closeCart();
  };

  return (
    <div
      data-testid="cart-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      onClick={closeCart}
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          data-testid="cart-drawer-container"
          className="w-screen max-w-md apple-glass border-l border-slate-800 shadow-2xl flex flex-col justify-between animate-slide-in-right"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-white tracking-tight">
                Your Equipment Cart ({items.length})
              </h2>
            </div>
            <button
              onClick={closeCart}
              data-testid="btn-close-cart"
              className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white apple-press"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderConfirmed ? (
              <div className="text-center py-10 space-y-4" data-testid="checkout-success-view">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white">Order Confirmed!</h3>
                <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                  Thank you for ordering with ClawExerMart. Your freight routing manifest and certified inspection reports have been filed.
                </p>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Order Number:</span>
                    <span className="font-mono font-bold text-amber-400">
                      CEM-ORD-{Math.floor(100000 + Math.random() * 900000)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Paid:</span>
                    <span className="font-bold text-white">${grandTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Freight Carrier:</span>
                    <span className="font-semibold text-slate-200">R&L Carriers LTL (Hydraulic Liftgate)</span>
                  </div>
                </div>
                <button
                  onClick={handleFinishOrder}
                  data-testid="btn-finish-order"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs apple-press shadow"
                >
                  Continue Browsing
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 space-y-3" data-testid="cart-empty-view">
                <div className="w-12 h-12 rounded-full bg-slate-900 text-slate-500 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Your cart is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Explore our inventory of new and certified pre-owned strength, cardio, and free weight gear.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(({ equipment, quantity, deliveryTier, deliveryCost }) => (
                  <div
                    key={equipment.id}
                    data-testid={`cart-item-${equipment.id}`}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3"
                  >
                    <div className="flex gap-3">
                      <img
                        src={equipment.images[0]}
                        alt={equipment.title}
                        className="w-16 h-16 rounded-xl object-cover bg-slate-950 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <ConditionBadge condition={equipment.condition} />
                          <button
                            onClick={() => removeItem(equipment.id)}
                            data-testid={`btn-remove-${equipment.id}`}
                            className="text-slate-500 hover:text-rose-400 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h4 className="text-xs font-bold text-white truncate mt-1">
                          {equipment.title}
                        </h4>
                        <div className="text-xs font-extrabold text-amber-400 mt-0.5">
                          ${(equipment.price * quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Delivery Tier Selector */}
                    <div className="pt-2 border-t border-slate-800/80 text-[11px] space-y-1">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="flex items-center gap-1">
                          <Truck className="w-3 h-3 text-amber-400" />
                          Delivery Option:
                        </span>
                        <span className="font-semibold text-slate-200">
                          {deliveryCost === 0 ? 'FREE' : `$${deliveryCost}`}
                        </span>
                      </div>
                      <select
                        value={deliveryTier}
                        onChange={(e) => updateDeliveryTier(equipment.id, e.target.value as DeliveryTier)}
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-amber-500"
                      >
                        {equipment.deliveryOptions.localPickup && (
                          <option value="LOCAL_PICKUP">Local Pickup (FREE)</option>
                        )}
                        <option value="FREIGHT_CURBSIDE">
                          Freight Curbside (${equipment.deliveryOptions.freightCurbsidePrice})
                        </option>
                        {equipment.deliveryOptions.whiteGloveAssemblyAvailable && (
                          <option value="WHITE_GLOVE">
                            White Glove Assembly (${equipment.deliveryOptions.whiteGlovePrice})
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Totals & Checkout */}
          {items.length > 0 && !orderConfirmed && (
            <div className="p-6 border-t border-slate-800 bg-slate-950/80 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Equipment Subtotal</span>
                  <span className="text-white font-medium">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Freight & Logistics</span>
                  <span className="text-white font-medium">
                    {totalFreight === 0 ? 'FREE' : `$${totalFreight.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Tax (7.5%)</span>
                  <span className="text-white font-medium">${estimatedTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-amber-400 text-base" data-testid="cart-grand-total">
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSimulateCheckout}
                disabled={isCheckingOut}
                data-testid="btn-checkout"
                className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black text-xs md:text-sm apple-press shadow-lg flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <span>Securing Order & Generating Waybill...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 stroke-[2.5]" />
                    Proceed to Simulated Checkout
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected by 30-Day Claw Mechanical Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
