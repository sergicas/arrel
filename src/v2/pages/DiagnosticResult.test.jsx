import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import DiagnosticResult from './DiagnosticResult.jsx';
import { AREAS } from '../lib/types.js';

const mockUseArrel = vi.hoisted(() => vi.fn());

vi.mock('../state/useArrel.js', () => ({
  useArrel: () => mockUseArrel(),
}));

function renderDiagnosticResult(overrides = {}) {
  mockUseArrel.mockReturnValue({
    state: {
      primaryArea: AREAS.STRESS,
      diagnosisScores: {
        [AREAS.STRESS]: 10,
        [AREAS.PHYSICAL]: 4,
        [AREAS.COGNITIVE]: 2,
      },
    },
    acknowledgeDiagnosisResult: vi.fn(),
    startDiagnostic: vi.fn(),
    ...overrides,
  });

  render(
    <MemoryRouter>
      <DiagnosticResult />
    </MemoryRouter>
  );
}

describe('DiagnosticResult', () => {
  it('uses natural Catalan articles for the secondary focus', () => {
    renderDiagnosticResult();

    expect(screen.getByText(/També tindrem present el cos\./)).toBeInTheDocument();
    expect(screen.queryByText(/present cos\./)).not.toBeInTheDocument();
  });
});
