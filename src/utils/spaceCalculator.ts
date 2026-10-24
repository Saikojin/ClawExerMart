import { DimensionsInfo } from '../types/equipment';

export interface RoomDimensions {
  lengthFeet: number;
  widthFeet: number;
  ceilingHeightFeet: number;
}

export type FitStatus = 'FITS_PERFECTLY' | 'TIGHT_CLEARANCE' | 'EXCEEDS_CEILING' | 'EXCEEDS_FLOOR';

export interface FitAssessment {
  status: FitStatus;
  floorUsageSquareFeet: number;
  roomSquareFeet: number;
  floorUsagePercentage: number;
  ceilingMarginInches: number;
  notes: string;
}

export function evaluateGymSpaceFit(
  room: RoomDimensions,
  equipmentDimensions: DimensionsInfo,
  requiredCeilingClearanceInches: number
): FitAssessment {
  const roomLengthInches = room.lengthFeet * 12;
  const roomWidthInches = room.widthFeet * 12;
  const ceilingHeightInches = room.ceilingHeightFeet * 12;

  const floorUsageSquareFeet = Number(
    ((equipmentDimensions.lengthInches * equipmentDimensions.widthInches) / 144).toFixed(1)
  );
  const roomSquareFeet = Math.round(room.lengthFeet * room.widthFeet);
  const floorUsagePercentage = roomSquareFeet > 0
    ? Math.round((floorUsageSquareFeet / roomSquareFeet) * 100)
    : 0;

  const ceilingMarginInches = ceilingHeightInches - requiredCeilingClearanceInches;

  // Evaluation
  if (ceilingMarginInches < 0) {
    return {
      status: 'EXCEEDS_CEILING',
      floorUsageSquareFeet,
      roomSquareFeet,
      floorUsagePercentage,
      ceilingMarginInches,
      notes: `Deficit of ${Math.abs(ceilingMarginInches)}" under ceiling. Assembly or full overhead movement unsafe.`,
    };
  }

  // Check floor footprint
  if (
    equipmentDimensions.lengthInches > roomLengthInches ||
    equipmentDimensions.widthInches > roomWidthInches
  ) {
    return {
      status: 'EXCEEDS_FLOOR',
      floorUsageSquareFeet,
      roomSquareFeet,
      floorUsagePercentage,
      ceilingMarginInches,
      notes: 'Equipment dimensions exceed room floor boundaries.',
    };
  }

  // Tight clearance: less than 6 inches ceiling buffer or > 40% floor usage
  if (ceilingMarginInches < 6 || floorUsagePercentage > 40) {
    return {
      status: 'TIGHT_CLEARANCE',
      floorUsageSquareFeet,
      roomSquareFeet,
      floorUsagePercentage,
      ceilingMarginInches,
      notes: `Fits, but only ${ceilingMarginInches}" clearance above pull-up/overhead zone. Plan workout movement carefully.`,
    };
  }

  return {
    status: 'FITS_PERFECTLY',
    floorUsageSquareFeet,
    roomSquareFeet,
    floorUsagePercentage,
    ceilingMarginInches,
    notes: `Ample room. ${ceilingMarginInches}" overhead clearance allows full pull-ups, muscle-ups, and box jumps.`,
  };
}
