import { describe, it, expect } from 'vitest';
import { calculateEquipmentValuation } from '../utils/valuation';
import { evaluateGymSpaceFit } from '../utils/spaceCalculator';

describe('Tier 1 Unit Tests: Valuation & Space Calculator Utilities', () => {
  describe('calculateEquipmentValuation', () => {
    it('should compute appropriate resale ranges for high-demand equipment', () => {
      const result = calculateEquipmentValuation({
        category: 'CARDIO',
        brand: 'Concept2',
        originalMsrp: 1000,
        condition: 'USED_LIKE_NEW',
        yearPurchased: 2024,
      });

      expect(result.suggestedListPrice).toBeGreaterThan(600);
      expect(result.suggestedListPrice).toBeLessThanOrEqual(1000);
      expect(result.priceRangeMin).toBeLessThan(result.suggestedListPrice);
      expect(result.priceRangeMax).toBeGreaterThan(result.suggestedListPrice);
      expect(result.instantCashOffer).toBeLessThan(result.suggestedListPrice);
      expect(result.marketDemandIndex).toBe('VERY_HIGH');
      expect(result.turnaroundDaysAvg).toBe(4);
    });

    it('should discount more heavily for USED_FAIR condition and older equipment', () => {
      const result = calculateEquipmentValuation({
        category: 'STRENGTH',
        brand: 'Titan Fitness',
        originalMsrp: 1000,
        condition: 'USED_FAIR',
        yearPurchased: 2020,
      });

      expect(result.suggestedListPrice).toBeLessThan(500);
      expect(result.marketDemandIndex).toBe('MODERATE');
    });
  });

  describe('evaluateGymSpaceFit', () => {
    it('should report FITS_PERFECTLY when room dimensions and ceiling are ample', () => {
      const room = { lengthFeet: 20, widthFeet: 15, ceilingHeightFeet: 10 }; // 120" ceiling
      const equipmentDimensions = { lengthInches: 50, widthInches: 30, heightInches: 80, weightLbs: 200 };
      const clearanceRequired = 90; // 90" required

      const assessment = evaluateGymSpaceFit(room, equipmentDimensions, clearanceRequired);

      expect(assessment.status).toBe('FITS_PERFECTLY');
      expect(assessment.ceilingMarginInches).toBe(30);
      expect(assessment.floorUsagePercentage).toBeLessThan(10);
    });

    it('should flag EXCEEDS_CEILING when rack height exceeds basement ceiling', () => {
      const room = { lengthFeet: 12, widthFeet: 10, ceilingHeightFeet: 7.5 }; // 90" ceiling
      const equipmentDimensions = { lengthInches: 53, widthInches: 34, heightInches: 90, weightLbs: 285 };
      const clearanceRequired = 96; // 96" required for overhead pull-ups

      const assessment = evaluateGymSpaceFit(room, equipmentDimensions, clearanceRequired);

      expect(assessment.status).toBe('EXCEEDS_CEILING');
      expect(assessment.ceilingMarginInches).toBe(-6);
      expect(assessment.notes).toContain('Deficit of 6"');
    });

    it('should flag TIGHT_CLEARANCE when ceiling margin is under 6 inches', () => {
      const room = { lengthFeet: 12, widthFeet: 10, ceilingHeightFeet: 8 }; // 96" ceiling
      const equipmentDimensions = { lengthInches: 53, widthInches: 34, heightInches: 90, weightLbs: 285 };
      const clearanceRequired = 94; // 94" required, margin = 2"

      const assessment = evaluateGymSpaceFit(room, equipmentDimensions, clearanceRequired);

      expect(assessment.status).toBe('TIGHT_CLEARANCE');
      expect(assessment.ceilingMarginInches).toBe(2);
    });
  });
});
