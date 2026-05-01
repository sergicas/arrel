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
        'Prepara-ho: deixa a mà el que necessitis.',
        'Camina deu minuts a un ritme còmode.',
        'Tanca-ho: marca el resultat.',
      ],
    },
    todayArea: AREAS.STRESS,
    todayGuidance: 'Avui busquem una pausa concreta.',
    coachDecision: { difficulty: 'standard', insight: 'Bon dia.' },
    userStyle: 'balanced',
    burnoutRisk: { risk: 'low', message: null },
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
    expect(screen.getByText('Fes la prova.')).toBeInTheDocument();
    expect(screen.getByText('Prepara-ho: deixa a mà el que necessitis.')).toBeInTheDocument();
    expect(screen.queryByText('Avís: Si notes molèstia, atura la prova i marca «Ho deixo per avui».')).not.toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Iniciar' })).toBeInTheDocument();
  });

  it('frames the daily note as a useful sentence for the cycle reading', () => {
    renderToday();

    expect(screen.getByText('Una frase sobre avui')).toBeInTheDocument();
    expect(screen.getByText('Ajudarà Arrel a llegir millor el cicle.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Exemple: m’ha costat començar, però després m’ha anat bé.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'M’ha anat bé quan…' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'M’ha costat perquè…' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Voldria repetir…' })).toBeInTheDocument();
  });

  it('uses quick note chips as optional writing helpers', () => {
    renderToday();

    fireEvent.click(screen.getByRole('button', { name: 'M’ha costat perquè…' }));

    expect(screen.getByPlaceholderText('Exemple: m’ha costat començar, però després m’ha anat bé.')).toHaveValue('M’ha costat perquè…');
  });

  it('keeps the note optional when saving a reading', () => {
    const { submitFeedback } = renderToday();

    fireEvent.click(screen.getByText('Fet'));
    fireEvent.click(screen.getByRole('button', { name: 'Guardar la lectura' }));

    expect(submitFeedback).toHaveBeenCalledWith(FEEDBACK.DONE, '');
  });

  it('displays the adaptive coach message and adapts the action when yesterday was tough', () => {
    renderToday({
      coachDecision: {
        difficulty: 'easy',
        insight: 'Ahir vas notar que la prova de Cos demanava força.',
      },
      todayAction: {
        text: 'fes dues aixecades de cadira',
        isAdapted: true,
      },
    });

    expect(screen.getByText(/Ahir vas notar que la prova/)).toBeInTheDocument();
    expect(screen.getByText('Prova adaptada')).toBeInTheDocument();
    expect(screen.getByText(/fes dues aixecades de cadira/)).toBeInTheDocument();
  });

  it('displays the burnout prevention banner when risk is detected', () => {
    renderToday({
      burnoutRisk: {
        risk: 'high',
        message: 'Sembla que el ritme d’aquests últims tres dies demana molta energia.',
      },
    });

    expect(screen.getByText(/ritme d’aquests últims tres dies/)).toBeInTheDocument();
  });

  it('shows the safety note only for physical actions', () => {
    renderToday({
      todayArea: AREAS.PHYSICAL,
      todayGuidance: 'Avui treballes mobilitat.',
    });

    expect(screen.getByText('Avís: Si notes molèstia, atura la prova i marca «Ho deixo per avui».')).toBeInTheDocument();
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

  it('keeps starter mode on a single path without a diagnostic CTA', () => {
    renderToday();

    expect(screen.getByText('Capacitat d’inici')).toBeInTheDocument();
    expect(screen.getByText('Aquesta setmana comences per Calma')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Ajustar focus' })).not.toBeInTheDocument();
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

    expect(screen.getByText('Capacitat personalitzada')).toBeInTheDocument();
    expect(screen.getByText('Aquesta setmana: Calma')).toBeInTheDocument();
    expect(screen.getByLabelText('Resultat resumit del focus')).toBeInTheDocument();
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

    expect(screen.getByText('Prova guardada.')).toBeInTheDocument();
    expect(screen.getByLabelText('Temps fins a la prova següent')).toHaveTextContent('14 h 30 min');
    expect(screen.getByRole('button', { name: 'S’obre demà' })).toBeDisabled();
  });

  it('lets an already closed day advance immediately on accelerated rhythm', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 3, 27, 9, 30));

    const { advanceDay } = renderToday({
      currentDayCompleted: true,
      canAdvanceDay: false,
      state: {
        cycleNumber: 1,
        dayInCycle: 1,
        feedbackJustGiven: false,
        feedback: [{ cycle: 1, day: 1, value: FEEDBACK.DONE }],
        currentDayAvailableOn: '2026-04-27',
        nextDayAvailableAt: null,
        pace: 'accelerated',
      },
    });

    const nextButton = screen.getByRole('button', { name: 'Obrir la prova següent' });
    expect(nextButton).toBeEnabled();

    fireEvent.click(nextButton);
    expect(advanceDay).toHaveBeenCalledTimes(1);
  });

  it('names the rest day when the next step is day 7', () => {
    renderToday({
      currentDayCompleted: true,
      canAdvanceDay: true,
      state: {
        cycleNumber: 1,
        dayInCycle: 6,
        feedbackJustGiven: false,
        feedback: [{ cycle: 1, day: 6, value: FEEDBACK.DONE }],
        currentDayAvailableOn: '2026-04-27',
        pace: 'accelerated',
      },
    });

    expect(screen.getByRole('button', { name: 'Obrir el descans' })).toBeEnabled();
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
