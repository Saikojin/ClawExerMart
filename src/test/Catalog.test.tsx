import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Catalog } from '../components/Catalog';
import { CartProvider } from '../context/CartContext';

describe('Catalog & Filter Integration Tests (Tier 2)', () => {
  it('should render equipment cards and filter by condition (New vs Pre-Owned)', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const handleNavigateSell = vi.fn();
    const handleNavigateSpace = vi.fn();

    render(
      <CartProvider>
        <Catalog
          onSelectItem={handleSelect}
          onNavigateSell={handleNavigateSell}
          onNavigateSpace={handleNavigateSpace}
        />
      </CartProvider>
    );

    // Initial load renders multiple equipment items
    const initialCards = screen.getAllByTestId(/^equipment-card-eq-/);
    expect(initialCards.length).toBeGreaterThanOrEqual(10);

    // Filter by Brand New Only
    await user.click(screen.getByTestId('filter-condition-ALL_NEW'));
    const newCards = screen.getAllByTestId(/^equipment-card-eq-/);
    expect(newCards.length).toBeGreaterThanOrEqual(3);
    newCards.forEach((card) => {
      expect(card).toHaveTextContent(/Brand New/i);
    });

    // Filter by Pre-Owned & Refurbished
    await user.click(screen.getByTestId('filter-condition-ALL_USED'));
    const usedCards = screen.getAllByTestId(/^equipment-card-eq-/);
    expect(usedCards.length).toBeGreaterThanOrEqual(5);
  });

  it('should filter items by search text matching brand or model', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <Catalog
          onSelectItem={vi.fn()}
          onNavigateSell={vi.fn()}
          onNavigateSpace={vi.fn()}
        />
      </CartProvider>
    );

    const searchInput = screen.getByTestId('input-catalog-search');
    await user.type(searchInput, 'Concept2');

    const cards = screen.getAllByTestId(/^equipment-card-eq-/);
    expect(cards.length).toBe(1);
    expect(screen.getByText(/Concept2 RowErg/i)).toBeInTheDocument();
  });

  it('should display empty state when filter criteria matches nothing and reset properly', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <Catalog
          onSelectItem={vi.fn()}
          onNavigateSell={vi.fn()}
          onNavigateSpace={vi.fn()}
        />
      </CartProvider>
    );

    const searchInput = screen.getByTestId('input-catalog-search');
    await user.type(searchInput, 'NonExistentSpaceshipGymRig');

    expect(screen.getByTestId('catalog-empty-state')).toBeInTheDocument();

    // Reset filters
    await user.click(screen.getByTestId('btn-reset-filters'));
    expect(screen.getByTestId('catalog-grid')).toBeInTheDocument();
  });
});
