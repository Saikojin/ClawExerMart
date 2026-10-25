import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('SeikoClaw break-ui Adversarial Stress Suite', () => {
  it('switches between Demo data, Worst case, 1 item, and Empty states via BreakUiToggle', () => {
    render(<App />);

    // Default: Demo data (12 items)
    expect(screen.getByTestId('results-count')).toHaveTextContent('12 Equipment Listings Found');

    // Switch to Worst case (3 items including $24,995 and $129,999 commercial lots)
    fireEvent.click(screen.getByTestId('break-ui-mode-worst'));
    expect(screen.getByTestId('results-count')).toHaveTextContent('3 Equipment Listings Found');
    expect(screen.getByText(/\$24,995/)).toBeInTheDocument();
    expect(screen.getByText(/\$129,999/)).toBeInTheDocument();
    expect(
      screen.getByText(/Hammer Strength HD Athletic Perimeter 8-Station/i)
    ).toBeInTheDocument();

    // Switch to 1 item (verifies singular grammar: "1 Equipment Listing Found")
    fireEvent.click(screen.getByTestId('break-ui-mode-single'));
    expect(screen.getByTestId('results-count')).toHaveTextContent('1 Equipment Listing Found');

    // Switch to Empty (0 items, renders empty state card)
    fireEvent.click(screen.getByTestId('break-ui-mode-empty'));
    expect(screen.getByTestId('results-count')).toHaveTextContent('0 Equipment Listings Found');
    expect(screen.getByTestId('catalog-empty-state')).toBeInTheDocument();
  });

  it('replaces broken image URLs with the verified equipment fallback surface', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('break-ui-mode-worst'));

    const card = screen.getByTestId('equipment-card-wc-002');
    const img = card.querySelector('img');
    expect(img).not.toBeNull();
    if (img) {
      fireEvent.error(img);
    }

    expect(screen.getByTestId('img-fallback-wc-002')).toHaveTextContent(
      'Verified Equipment Photo Pending'
    );
  });
});
