import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Rest from './Rest.jsx';
import { AREAS, FEEDBACK } from '../lib/types.js';

const mockUseArrel = vi.hoisted(() => vi.fn());

vi.mock('../state/useArrel.js', () => ({
  useArrel: () => mockUseArrel(),
}));

function renderRest(overrides = {}) {
  const advanceDay = vi.fn();
  const generateCycleReading = vi.fn();

  mockUseArrel.mockReturnValue({
    state: {
      cycleNumber: 1,
      dayInCycle: 7,
      primaryArea: AREAS.STRESS,
      currentCycleArea: AREAS.STRESS,
      feedback: [
        {
          cycle: 1,
          day: 1,
          text: 'Asseu-te en silenci tres minuts.',
          duration: '≈ 3 min',
          area: AREAS.STRESS,
          value: FEEDBACK.DONE,
          completedOn: '2026-04-27',
        },
      ],
      cycleReadings: [],
      currentDayAvailableOn: '2026-04-27',
      nextDayAvailableAt: null,
      pace: 'accelerated',
    },
    canAdvanceDay: true,
    advanceDay,
    generateCycleReading,
    ...overrides,
  });

  render(
    <MemoryRouter>
      <Rest />
    </MemoryRouter>
  );

  return { advanceDay, generateCycleReading };
}

describe('Rest v2', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('offers a personal reading when the cycle has no saved reading yet', () => {
    const { generateCycleReading } = renderRest();

    expect(screen.getByText('Lectura personal')).toBeInTheDocument();
    expect(screen.getByText('Arrel pot llegir aquest cicle i proposar-te un següent pas.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Generar lectura personal' }));

    expect(generateCycleReading).toHaveBeenCalledTimes(1);
  });

  it('shows the saved personal reading and lets the user update it', () => {
    const { generateCycleReading } = renderRest({
      state: {
        cycleNumber: 1,
        dayInCycle: 7,
        primaryArea: AREAS.STRESS,
        currentCycleArea: AREAS.STRESS,
        feedback: [],
        cycleReadings: [
          {
            cycle: 1,
            createdAt: 1760000000000,
            reading: {
              title: 'Lectura del cicle',
              pattern: 'Amb les dades d’aquest cicle, sembla que alguns dies han demanat ajustar el ritme.',
              availableCapacity: 'La capacitat que apareix amb més disponibilitat és Calma.',
              carePoint: 'El punt a cuidar podria ser Calma.',
              nextActionStyle: 'Tria una acció curta, concreta i fàcil de començar.',
              confidence: 'mitjana',
            },
          },
        ],
        currentDayAvailableOn: '2026-04-27',
        nextDayAvailableAt: null,
        pace: 'accelerated',
      },
    });

    expect(screen.getByText('Lectura del cicle')).toBeInTheDocument();
    expect(screen.getByText('mitjana')).toBeInTheDocument();
    expect(screen.getByText(/Amb les dades d’aquest cicle/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Actualitzar lectura' }));

    expect(generateCycleReading).toHaveBeenCalledTimes(1);
  });
});
