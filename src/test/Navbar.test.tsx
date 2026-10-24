import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar, NavTab } from '../components/Navbar';
import { CartProvider } from '../context/CartContext';

describe('Navbar Component (Tier 2 Integration)', () => {
  it('should render brand logo, navigation tabs, and cart trigger', () => {
    const handleTabChange = vi.fn();
    render(
      <CartProvider>
        <Navbar activeTab="catalog" onTabChange={handleTabChange} />
      </CartProvider>
    );

    expect(screen.getByTestId('nav-logo')).toBeInTheDocument();
    expect(screen.getByText('ClawExerMart')).toBeInTheDocument();
    expect(screen.getByTestId('tab-catalog')).toBeInTheDocument();
    expect(screen.getByTestId('tab-sell')).toBeInTheDocument();
    expect(screen.getByTestId('tab-space-matcher')).toBeInTheDocument();
    expect(screen.getByTestId('tab-story-qa')).toBeInTheDocument();
    expect(screen.getByTestId('nav-cart-btn')).toBeInTheDocument();
  });

  it('should trigger onTabChange callback when navigation tabs are clicked', async () => {
    const user = userEvent.setup();
    const handleTabChange = vi.fn();
    render(
      <CartProvider>
        <Navbar activeTab="catalog" onTabChange={handleTabChange} />
      </CartProvider>
    );

    await user.click(screen.getByTestId('tab-sell'));
    expect(handleTabChange).toHaveBeenCalledWith('sell' as NavTab);

    await user.click(screen.getByTestId('tab-space-matcher'));
    expect(handleTabChange).toHaveBeenCalledWith('space-matcher' as NavTab);
  });
});
