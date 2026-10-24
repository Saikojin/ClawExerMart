import React, { createContext, useContext, useState, useEffect } from 'react';
import { EquipmentItem } from '../types/equipment';

export type DeliveryTier = 'LOCAL_PICKUP' | 'FREIGHT_CURBSIDE' | 'WHITE_GLOVE';

export interface CartItem {
  equipment: EquipmentItem;
  quantity: number;
  deliveryTier: DeliveryTier;
  deliveryCost: number;
}

export interface UserOffer {
  id: string;
  equipmentId: string;
  equipmentTitle: string;
  offerAmount: number;
  askingPrice: number;
  userEmail: string;
  status: 'PENDING_SELLER_REVIEW' | 'COUNTERED' | 'ACCEPTED';
  createdAt: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (equipment: EquipmentItem, deliveryTier?: DeliveryTier) => void;
  removeItem: (equipmentId: string) => void;
  updateDeliveryTier: (equipmentId: string, tier: DeliveryTier) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  itemCount: number;
  subtotal: number;
  totalFreight: number;
  estimatedTax: number;
  grandTotal: number;
  userOffers: UserOffer[];
  submitOffer: (equipment: EquipmentItem, amount: number, email: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('clawexermart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [userOffers, setUserOffers] = useState<UserOffer[]>(() => {
    try {
      const saved = localStorage.getItem('clawexermart_offers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('clawexermart_cart', JSON.stringify(items));
    } catch {
      // ignore in SSR/restricted environments
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('clawexermart_offers', JSON.stringify(userOffers));
    } catch {
      // ignore
    }
  }, [userOffers]);

  const calculateDeliveryCost = (equipment: EquipmentItem, tier: DeliveryTier): number => {
    if (tier === 'LOCAL_PICKUP') return 0;
    if (tier === 'WHITE_GLOVE' && equipment.deliveryOptions.whiteGlovePrice) {
      return equipment.deliveryOptions.whiteGlovePrice;
    }
    return equipment.deliveryOptions.freightCurbsidePrice;
  };

  const addItem = (equipment: EquipmentItem, deliveryTier: DeliveryTier = 'FREIGHT_CURBSIDE') => {
    const deliveryCost = calculateDeliveryCost(equipment, deliveryTier);
    setItems((prev) => {
      const existing = prev.find((i) => i.equipment.id === equipment.id);
      if (existing) {
        return prev.map((i) =>
          i.equipment.id === equipment.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { equipment, quantity: 1, deliveryTier, deliveryCost }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (equipmentId: string) => {
    setItems((prev) => prev.filter((i) => i.equipment.id !== equipmentId));
  };

  const updateDeliveryTier = (equipmentId: string, tier: DeliveryTier) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.equipment.id === equipmentId) {
          const newCost = calculateDeliveryCost(i.equipment, tier);
          return { ...i, deliveryTier: tier, deliveryCost: newCost };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.equipment.price * item.quantity, 0);
  const totalFreight = items.reduce((sum, item) => sum + item.deliveryCost * item.quantity, 0);
  const estimatedTax = Math.round(subtotal * 0.075); // 7.5% est. sales tax
  const grandTotal = subtotal + totalFreight + estimatedTax;

  const submitOffer = (equipment: EquipmentItem, amount: number, email: string) => {
    const newOffer: UserOffer = {
      id: `off-${Date.now()}`,
      equipmentId: equipment.id,
      equipmentTitle: equipment.title,
      offerAmount: amount,
      askingPrice: equipment.price,
      userEmail: email,
      status: 'PENDING_SELLER_REVIEW',
      createdAt: new Date().toISOString(),
    };
    setUserOffers((prev) => [newOffer, ...prev]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateDeliveryTier,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        itemCount,
        subtotal,
        totalFreight,
        estimatedTax,
        grandTotal,
        userOffers,
        submitOffer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
