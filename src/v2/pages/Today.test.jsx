import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Today from './Today.jsx';
import { AREAS, FEEDBACK } from '../lib/types.js';

const mockUseArrel = vi.hoisted(() => vi.fn());

vi.mock('../state/useArrel.js', () => ({
  useArrel: () => mockUseArrel(),
}));

function renderToday(overrides = {}) {
  const submitFeedback = vi.fn();
  const advanceDay = vi.fn();
  const startDiagnostic = vi.fn();

  mockUseArrel.mockReturnValue({
    state: {
      cycleNumber: 1,
      dayInCycle: 1,
      feedbackJustGiven: false,
      feedback: [],
    },
    todayAction: {
      duration: '≈ 10 min',
      text: 'Camina deu minuts a un ritme còmode.',
      steps: [
        'Prepara-ho: fes lloc a l’acció.',
        'Camina deu minuts a un ritme còmode.',
        'Tanca-ho: marca què ha passat.',
      ],
    },
    todayArea: AREAS.STRESS,
    todayGuidance: 'Avui busquem una pausa concreta.',
    hasDiagnostic: false,
    currentDayCompleted: false,
    canAdvanceDay: false,
    submitFeedback,
    advanceDay,
    startDiagnostic,
    ...overrides,
  });

  render(
    <MemoryRouter>
      <Today />
    </MemoryRouter>
  );

  return { submitFeedback, advanceDay, startDiagnostic };
}

describe('Today v2', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('shows a short action guide with a timer based on the action duration', () => {
    renderToday();

    expect(screen.getByText('Guia curta')).toBeInTheDocument();
    expect(screen.getByText('Fes-la ara, petita i literal.')).toBeInTheDocument();
    expect(screen.getByText('Prepara-ho: fes lloc a l’acció.')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Iniciar' })).toBeInTheDocument();
  });

  it('starts and pauses the action timer', () => {
    vi.useFakeTimers();
    renderToday();

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar' }));

    expect(screen.getByRole('button', { name: 'Pausar' })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('9:59')).toBeInTheDocument();
  });

  it('offers the diagnostic when the user is still in starter mode', () => {
    const { startDiagnostic } = renderToday();

    expect(screen.getByText('Millora la prova')).toBeInTheDocument();
    expect(screen.getByText('Vols que Arrel triï millor per tu?')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Fer diagnosi' }));

    expect(startDiagnostic).toHaveBeenCalledTimes(1);
  });

  it('shows the personalized focus summary after a diagnostic', () => {
    renderToday({
      hasDiagnostic: true,
      state: {
        cycleNumber: 1,
        dayInCycle: 1,
        feedbackJustGiven: false,
        diagnosisScores: {
          [AREAS.STRESS]: 10,
          [AREAS.COGNITIVE]: 4,
          [AREAS.PHYSICAL]: 2,
        },
      },
    });

    expect(screen.getByText('Focus personalitzat')).toBeInTheDocument();
    expect(screen.getByText('Aquesta setmana: Estrès')).toBeInTheDocument();
    expect(screen.getByLabelText('Resultat resumit de la diagnosi')).toBeInTheDocument();
  });

  it('shows when the next day opens after the current day is closed', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 3, 27, 9, 30));

    renderToday({
      currentDayCompleted: true,
      canAdvanceDay: false,
      state: {
        cycleNumber: 1,
        dayInCycle: 1,
        feedbackJustGiven: false,
        feedback: [],
        currentDayAvailableOn: '2026-04-27',
      },
    });

    expect(screen.getByText('Avui ja té una petjada.')).toBeInTheDocument();
    expect(screen.getByLabelText('Temps fins al dia següent')).toHaveTextContent('14 h 30 min');
    expect(screen.getByRole('button', { name: 'S’obre demà' })).toBeDisabled();
  });

  it('keeps the mascot celebratory when the current day feedback was already saved', () => {
    renderToday({
      currentDayCompleted: true,
      dayFeedback: { cycle: 1, day: 1, value: FEEDBACK.DONE },
      state: {
        cycleNumber: 1,
        dayInCycle: 1,
        feedbackJustGiven: false,
        feedback: [{ cycle: 1, day: 1, value: FEEDBACK.DONE }],
        currentDayAvailableOn: '2026-04-27',
      },
    });

    expect(document.querySelector('.v2-day-mascot')).toHaveAttribute('data-mood', 'celebrate');
  });

  it('uses the previous day feedback to set a quieter mascot mood on the next action', () => {
    renderToday({
      state: {
        cycleNumber: 1,
        dayInCycle: 2,
        feedbackJustGiven: false,
        feedback: [{ cycle: 1, day: 1, value: FEEDBACK.SKIPPED }],
      },
    });

    expect(document.querySelector('.v2-day-mascot')).toHaveAttribute('data-mood', 'rest');
  });
});
