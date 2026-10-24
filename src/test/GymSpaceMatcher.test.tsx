import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GymSpaceMatcher } from '../components/GymSpaceMatcher';

describe('GymSpaceMatcher & Clearance Engine (Tier 2)', () => {
  it('should render room controls and dynamically evaluate clearance', async () => {
    const handleSelect = vi.fn();
    render(<GymSpaceMatcher onSelectItem={handleSelect} />);

    expect(screen.getByTestId('gym-space-matcher')).toBeInTheDocument();
    expect(screen.getByTestId('val-ceiling-height')).toHaveTextContent('8 ft (96")');

    // Cards are categorized into fit statuses
    const cards = screen.getAllByTestId(/^space-card-eq-/);
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should update room dimensions when switching presets', async () => {
    const user = userEvent.setup();
    render(<GymSpaceMatcher onSelectItem={vi.fn()} />);

    // Click on 2-Car Garage preset
    const garagePreset = screen.getByText(/2-Car Garage/i);
    await user.click(garagePreset);

    expect(screen.getByTestId('val-ceiling-height')).toHaveTextContent('9.5 ft (114")');
  });
});
