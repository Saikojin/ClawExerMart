import { EquipmentCategory, EquipmentCondition } from './equipment';

export interface ValuationEstimate {
  suggestedListPrice: number;
  priceRangeMin: number;
  priceRangeMax: number;
  instantCashOffer: number;
  marketDemandIndex: 'HIGH' | 'VERY_HIGH' | 'MODERATE';
  turnaroundDaysAvg: number;
  comparableSoldUnitsCount: number;
}

export interface SellListingFormState {
  category: EquipmentCategory;
  brand: string;
  model: string;
  yearPurchased: number;
  condition: EquipmentCondition;
  askingPrice: number;
  sellerNotes: string;
  hasOriginalAccessories: boolean;
  isInspectedByOwner: boolean;
  ownerEmail: string;
  ownerZip: string;
  inspectionPreference: 'CLAW_MOBILE_INSPECTION' | 'SELF_DROP_OFF' | 'FREIGHT_PICKUP';
}
