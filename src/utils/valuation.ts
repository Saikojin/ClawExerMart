import { EquipmentCategory, EquipmentCondition } from '../types/equipment';
import { ValuationEstimate } from '../types/sell';

interface ValuationInput {
  category: EquipmentCategory;
  brand: string;
  originalMsrp: number;
  condition: EquipmentCondition;
  yearPurchased: number;
}

const BRAND_RETENTION_MULTIPLIERS: Record<string, number> = {
  'rogue fitness': 1.15,
  'concept2': 1.20,
  'eleiko': 1.25,
  'rep fitness': 1.05,
  'life fitness': 0.95,
  'bowflex': 0.90,
  'titan fitness': 0.88,
  'kabuki strength': 1.12,
  'assault fitness': 1.05,
  'prx performance': 1.08,
  'ironmaster': 1.10,
};

const CONDITION_DISCOUNT_RATIOS: Record<EquipmentCondition, number> = {
  NEW: 1.0,
  CERTIFIED_REFURBISHED: 0.82,
  USED_LIKE_NEW: 0.75,
  USED_GOOD: 0.62,
  USED_FAIR: 0.48,
};

export function calculateEquipmentValuation(input: ValuationInput): ValuationEstimate {
  const brandKey = input.brand.toLowerCase().trim();
  const brandMultiplier = BRAND_RETENTION_MULTIPLIERS[brandKey] ?? 1.0;
  const conditionFactor = CONDITION_DISCOUNT_RATIOS[input.condition] ?? 0.6;

  // Age factor: deprecate 3% per year beyond 1 year, floor at 0.70
  const currentYear = 2026;
  const ageYears = Math.max(0, currentYear - input.yearPurchased);
  const ageFactor = Math.max(0.70, 1.0 - ageYears * 0.03);

  // Baseline market price calculation
  const calculatedBaseline = Math.round(
    input.originalMsrp * conditionFactor * brandMultiplier * ageFactor
  );

  const priceRangeMin = Math.round(calculatedBaseline * 0.92);
  const priceRangeMax = Math.round(calculatedBaseline * 1.08);
  const suggestedListPrice = calculatedBaseline;
  
  // Instant cash buyout offer is ~72% of suggested list price (covers inspection, freight & warranty)
  const instantCashOffer = Math.round(suggestedListPrice * 0.72);

  // Market demand determination
  let marketDemandIndex: ValuationEstimate['marketDemandIndex'] = 'MODERATE';
  if (['concept2', 'rogue fitness', 'eleiko'].includes(brandKey)) {
    marketDemandIndex = 'VERY_HIGH';
  } else if (brandMultiplier >= 1.0) {
    marketDemandIndex = 'HIGH';
  }

  const turnaroundDaysAvg = marketDemandIndex === 'VERY_HIGH' ? 4 : marketDemandIndex === 'HIGH' ? 9 : 18;
  const comparableSoldUnitsCount = Math.floor(18 + (brandMultiplier * 14) + (conditionFactor * 10));

  return {
    suggestedListPrice,
    priceRangeMin,
    priceRangeMax,
    instantCashOffer,
    marketDemandIndex,
    turnaroundDaysAvg,
    comparableSoldUnitsCount,
  };
}
