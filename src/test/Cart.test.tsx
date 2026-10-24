import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartDrawer } from '../components/CartDrawer';
import { CartProvider, useCart } from '../context/CartContext';
import { MOCK_EQUIPMENT } from '../data/mockEquipment';

const CartTestController = () => {
  const { addItem, openCart } = useCart();
  return (
    <div>
      <button
        data-testid="btn-add-test-item"
        onClick={() => {
          addItem(MOCK_EQUIPMENT[0]);
          openCart();
        }}
      >
        Add Test Item
      </button>
      <CartDrawer />
    </div>
  );
};

describe('CartDrawer & Checkout Simulation (Tier 2 Integration)', () => {
  it('should display added items, compute freight totals, and simulate checkout', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartTestController />
      </CartProvider>
    );

    // Add item to cart
    await user.click(screen.getByTestId('btn-add-test-item'));

    expect(screen.getByTestId('cart-drawer-container')).toBeInTheDocument();
    expect(screen.getByTestId(`cart-item-${MOCK_EQUIPMENT[0].id}`)).toBeInTheDocument();
    expect(screen.getByTestId('cart-grand-total')).toBeInTheDocument();

    // Trigger simulated checkout
    const checkoutBtn = screen.getByTestId('btn-checkout');
    await user.click(checkoutBtn);

    // Wait for simulated async checkout completion
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
    });

    expect(screen.getByTestId('checkout-success-view')).toBeInTheDocument();
    expect(screen.getByText(/Order Confirmed!/i)).toBeInTheDocument();
  });
});
