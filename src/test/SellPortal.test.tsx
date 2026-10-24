import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SellPortal } from '../components/SellPortal';

describe('Sell & Consignment Valuation Portal (Tier 2)', () => {
  it('should render reactive algorithmic valuation and update upon user input', async () => {
    const user = userEvent.setup();
    render(<SellPortal />);

    expect(screen.getByTestId('sell-portal')).toBeInTheDocument();
    expect(screen.getByTestId('valuation-card')).toBeInTheDocument();
    expect(screen.getByText(/Live Valuation Engine/i)).toBeInTheDocument();
    expect(screen.getByText(/Instant Claw Cash Buyout/i)).toBeInTheDocument();

    // Change category to CARDIO
    const cardioBtn = screen.getByTestId('sell-category-CARDIO');
    await user.click(cardioBtn);

    // Change MSRP
    const msrpInput = screen.getByTestId('sell-msrp-input');
    await user.clear(msrpInput);
    await user.type(msrpInput, '2000');

    // Live valuation card should display calculated outputs
    expect(screen.getByTestId('valuation-card')).toBeInTheDocument();
  });

  it('should accept seller intake form submission and display appraisal reference', async () => {
    const user = userEvent.setup();
    render(<SellPortal />);

    const emailInput = screen.getByTestId('sell-email-input');
    await user.type(emailInput, 'gymowner@crossfitbox.com');

    const zipInput = screen.getByTestId('sell-zip-input');
    await user.clear(zipInput);
    await user.type(zipInput, '90210');

    const submitBtn = screen.getByTestId('btn-submit-sell-listing');
    fireEvent.submit(submitBtn.closest('form')!);

    expect(screen.getByTestId('sell-submission-success')).toBeInTheDocument();
    expect(screen.getByText(/Listing Appraisal Initiated!/i)).toBeInTheDocument();
    expect(screen.getByText(/CLAW-APP-/i)).toBeInTheDocument();
  });
});

