import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Paywall from './Paywall.jsx';

const mockUseArrel = vi.hoisted(() => vi.fn());

vi.mock('../state/useArrel.js', () => ({
  useArrel: () => mockUseArrel(),
}));

function renderPaywall() {
  const continueAfterInitialPeriod = vi.fn();
  mockUseArrel.mockReturnValue({ continueAfterInitialPeriod });

  render(
    <MemoryRouter>
      <Paywall />
    </MemoryRouter>
  );

  return { continueAfterInitialPeriod };
}

describe('Initial period complete screen', () => {
  it('lets the user continue without payment language', () => {
    const { continueAfterInitialPeriod } = renderPaywall();

    expect(screen.getByText('Període inicial complet')).toBeInTheDocument();
    expect(screen.getByText('Has acabat els dos primers cicles.')).toBeInTheDocument();
    expect(screen.queryByText(/subscrip|pagament|cobrament|targeta/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Continuar amb un nou cicle' }));

    expect(continueAfterInitialPeriod).toHaveBeenCalledTimes(1);
  });
});
