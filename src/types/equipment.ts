export type EquipmentCondition =
  | 'NEW'
  | 'CERTIFIED_REFURBISHED'
  | 'USED_LIKE_NEW'
  | 'USED_GOOD'
  | 'USED_FAIR';

export type EquipmentCategory =
  | 'STRENGTH'
  | 'CARDIO'
  | 'FREE_WEIGHTS'
  | 'ACCESSORIES';

export interface LocationInfo {
  city: string;
  state: string;
  zip: string;
  distanceMiles?: number;
}

export interface DimensionsInfo {
  lengthInches: number;
  widthInches: number;
  heightInches: number;
  weightLbs: number;
}

export interface InspectionReport {
  frameIntegrity: 'PASS' | 'EXCELLENT';
  bearingSmoothness?: 'PASS' | 'LIKE_NEW' | 'NA';
  cableTensionAndPulleys?: 'PASS' | 'NEW_CABLES' | 'NA';
  upholsteryWear?: 'PRISTINE' | 'MINOR_BLEMISH' | 'NONE';
  motorHoursCardio?: number;
  rustCheck: 'ZERO_RUST' | 'SURFACE_PATINA_ONLY' | 'TREATED';
  safetyLocksAndPins: 'PASS' | 'EXCELLENT';
  certifiedTechNotes: string;
  inspectionDate: string;
}

export interface SellerProfile {
  id: string;
  name: string;
  type: 'VERIFIED_COMMUNITY' | 'CERTIFIED_PRO_DEALER' | 'OFFICIAL_CLAW_OUTLET';
  rating: number;
  reviewsCount: number;
  badges: string[];
}

export interface DeliveryOptions {
  localPickup: boolean;
  freightCurbsidePrice: number;
  whiteGloveAssemblyAvailable: boolean;
  whiteGlovePrice?: number;
}

export interface EquipmentItem {
  id: string;
  title: string;
  brand: string;
  model: string;
  category: EquipmentCategory;
  condition: EquipmentCondition;
  price: number;
  originalMsrp: number;
  savingsPercentage: number;
  yearManufactured: number;
  location: LocationInfo;
  dimensions: DimensionsInfo;
  ceilingClearanceRequiredInches: number;
  images: string[];
  inspectionScore: number; // 0 - 100
  inspectionReport: InspectionReport;
  seller: SellerProfile;
  deliveryOptions: DeliveryOptions;
  warranty: string;
  featured: boolean;
  specs: Record<string, string>;
  description: string;
}

export interface CatalogFilterState {
  searchQuery: string;
  category: EquipmentCategory | 'ALL';
  condition: EquipmentCondition | 'ALL' | 'ALL_NEW' | 'ALL_USED';
  minPrice: number;
  maxPrice: number;
  brand: string;
  maxCeilingHeightInches?: number;
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'savings_desc' | 'newest';
}
