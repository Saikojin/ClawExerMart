import { describe, it, expect } from 'vitest';
import { MOCK_EQUIPMENT } from '../data/mockEquipment';

describe('Gym Equipment Domain Model & Mock Dataset', () => {
  it('should load all mock equipment items with required schema invariants', () => {
    expect(MOCK_EQUIPMENT.length).toBeGreaterThanOrEqual(10);

    MOCK_EQUIPMENT.forEach((item) => {
      expect(item.id).toMatch(/^eq-\d{3}$/);
      expect(item.title.length).toBeGreaterThan(5);
      expect(item.brand.length).toBeGreaterThan(1);
      expect(item.price).toBeGreaterThan(0);
      expect(item.originalMsrp).toBeGreaterThanOrEqual(item.price);
      expect(item.dimensions.heightInches).toBeGreaterThan(0);
      expect(item.dimensions.weightLbs).toBeGreaterThan(0);
      expect(item.ceilingClearanceRequiredInches).toBeGreaterThanOrEqual(item.dimensions.heightInches);
      expect(item.images.length).toBeGreaterThan(0);
      expect(item.inspectionScore).toBeGreaterThanOrEqual(80);
      expect(item.inspectionScore).toBeLessThanOrEqual(100);
      expect(item.seller.name.length).toBeGreaterThan(2);
      expect(item.seller.rating).toBeGreaterThanOrEqual(4.0);
    });
  });

  it('should include both NEW and PRE-OWNED/USED equipment', () => {
    const newItems = MOCK_EQUIPMENT.filter((item) => item.condition === 'NEW');
    const usedItems = MOCK_EQUIPMENT.filter((item) => item.condition !== 'NEW');

    expect(newItems.length).toBeGreaterThanOrEqual(3);
    expect(usedItems.length).toBeGreaterThanOrEqual(5);

    // Used items must display real savings and certified inspection notes
    usedItems.forEach((used) => {
      expect(used.savingsPercentage).toBeGreaterThanOrEqual(20);
      expect(used.inspectionReport.certifiedTechNotes.length).toBeGreaterThan(10);
    });
  });

  it('should span all core gym categories: STRENGTH, CARDIO, FREE_WEIGHTS', () => {
    const categories = new Set(MOCK_EQUIPMENT.map((item) => item.category));
    expect(categories.has('STRENGTH')).toBe(true);
    expect(categories.has('CARDIO')).toBe(true);
    expect(categories.has('FREE_WEIGHTS')).toBe(true);
  });
});
