import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Pace from './Pace.jsx';

const mockUseArrel = vi.hoisted(() => vi.fn());

vi.mock('../../state/useArrel.js', () => ({
  useArrel: () => mockUseArrel(),
}));

function renderPace(overrides = {}) {
  const setPace = vi.fn();

  mockUseArrel.mockReturnValue({
    state: {
      pace: 'slow',
      ...overrides.state,
    },
    setPace,
    ...overrides,
  });

  render(
    <MemoryRouter>
      <Pace />
    </MemoryRouter>
  );

  return { setPace };
}

describe('Pace settings', () => {
  it('shows the selectable rhythms', () => {
    renderPace();

    expect(screen.getByRole('radio', { name: /Lent/i })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: /Regular/i })).toBeInTheDocument();
    expect(screen.queryByRole('radio', { name: /Accelerat/i })).not.toBeInTheDocument();
  });

  it('stores the selected rhythm', () => {
    const { setPace } = renderPace();

    fireEvent.click(screen.getByRole('radio', { name: /Regular/i }));

    expect(setPace).toHaveBeenCalledWith('regular');
  });
});
