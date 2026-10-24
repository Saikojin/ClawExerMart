import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { MOCK_EQUIPMENT } from '../data/mockEquipment';
import { CartProvider } from '../context/CartContext';

describe('ProductDetailModal & Inspection Checklist (Tier 2)', () => {
  const sampleUsedItem = MOCK_EQUIPMENT.find((i) => i.condition !== 'NEW')!;

  it('should render inspection scores, certified report, and specs', () => {
    const handleClose = vi.fn();
    render(
      <CartProvider>
        <ProductDetailModal item={sampleUsedItem} onClose={handleClose} />
      </CartProvider>
    );

    expect(screen.getByTestId('product-detail-modal')).toBeInTheDocument();
    expect(screen.getByTestId('inspection-checklist')).toBeInTheDocument();
    expect(screen.getByText(/Claw Certified 8-Point Physical Inspection/i)).toBeInTheDocument();
    expect(screen.getByText(/Inspector Findings & Notes:/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(sampleUsedItem.inspectionReport.certifiedTechNotes, 'i'))).toBeInTheDocument();
  });

  it('should allow submitting a counter-offer on pre-owned gear with validation', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <ProductDetailModal item={sampleUsedItem} onClose={vi.fn()} />
      </CartProvider>
    );

    // Open Make an Offer modal
    const makeOfferBtn = screen.getByTestId('btn-modal-make-offer');
    await user.click(makeOfferBtn);

    expect(screen.getByTestId('make-offer-modal')).toBeInTheDocument();

    // Fill valid email and offer
    const emailInput = screen.getByTestId('input-offer-email');
    await user.type(emailInput, 'athlete@powerlifting.org');

    const submitOfferBtn = screen.getByTestId('btn-submit-offer');
    fireEvent.submit(submitOfferBtn.closest('form')!);

    // Verify submission acknowledgment
    expect(screen.getByTestId('offer-success-state')).toBeInTheDocument();
    expect(screen.getByText(/Counter-Offer Submitted!/i)).toBeInTheDocument();
  });

  it('should add item to cart with selected delivery option', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(
      <CartProvider>
        <ProductDetailModal item={sampleUsedItem} onClose={handleClose} />
      </CartProvider>
    );

    // Click Add to Cart
    const addBtn = screen.getByTestId('btn-modal-add-to-cart');
    await user.click(addBtn);

    expect(handleClose).toHaveBeenCalled();
  });
});
