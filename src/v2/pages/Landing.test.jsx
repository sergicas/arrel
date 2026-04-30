import { describe, it, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Landing from './Landing.jsx';
import { ArrelProvider } from '../state/ArrelContext.jsx';
import { useArrel } from '../state/useArrel.js';
import { AREAS, STATUS } from '../lib/types.js';

const STORAGE_KEY = 'arrel-v2-state';

function StateProbe() {
  const location = useLocation();
  const { state, todayAction } = useArrel();

  return (
    <output data-testid="state">
      {location.pathname}|{state.status}|{state.entryMode}|{state.primaryArea}|c{state.cycleNumber}|d{state.dayInCycle}|f{state.feedback.length}|{todayAction?.duration || 'sense-durada'}
    </output>
  );
}

function renderLanding() {
  render(
    <HelmetProvider>
      <ArrelProvider>
        <MemoryRouter initialEntries={['/inici']}>
          <Routes>
            <Route path="/inici" element={<Landing />} />
            <Route path="/app" element={<StateProbe />} />
          </Routes>
        </MemoryRouter>
      </ArrelProvider>
    </HelmetProvider>
  );
}

describe('Landing v2', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('lets the user choose where to start before opening today', async () => {
    renderLanding();

    fireEvent.click(screen.getByText('Triar per on començar'));

    expect(screen.getByRole('button', { name: /Cos/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Memòria/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ajustar focus/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tornar enrere' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Memòria/ }));

    await waitFor(() => {
      expect(screen.getByTestId('state')).toHaveTextContent(`/app|${STATUS.ACTIVE}|starter|${AREAS.COGNITIVE}|`);
    });
    expect(screen.getByTestId('state')).toHaveTextContent('min');
  });

  it('does not restart an active cycle without a clear in-app confirmation', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      status: STATUS.ACTIVE,
      entryMode: 'starter',
      primaryArea: AREAS.STRESS,
      cycleNumber: 1,
      dayInCycle: 2,
      currentDayAvailableOn: '2026-04-27',
      feedback: [{ cycle: 1, day: 1, value: 'done' }],
    }));

    renderLanding();

    fireEvent.click(screen.getByText('Triar per on començar'));
    fireEvent.click(screen.getByRole('button', { name: /Memòria/ }));

    expect(screen.getByText('Ja tens un cicle començat.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Obrir la prova actual' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sí, començar 7 dies de Memòria' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Obrir la prova actual' }));

    await waitFor(() => {
      expect(screen.getByTestId('state')).toHaveTextContent(`/app|${STATUS.ACTIVE}|starter|${AREAS.STRESS}|`);
    });
  });

  it('opens a new starter cycle from landing and keeps existing readings', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      status: STATUS.ACTIVE,
      entryMode: 'starter',
      primaryArea: AREAS.STRESS,
      cycleNumber: 1,
      dayInCycle: 2,
      currentDayAvailableOn: '2026-04-27',
      feedback: [{ cycle: 1, day: 1, value: 'done' }],
    }));

    renderLanding();

    fireEvent.click(screen.getByText('Triar per on començar'));
    fireEvent.click(screen.getByRole('button', { name: /Memòria/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Sí, començar 7 dies de Memòria' }));

    await waitFor(() => {
      expect(screen.getByTestId('state')).toHaveTextContent(
        `/app|${STATUS.ACTIVE}|starter|${AREAS.COGNITIVE}|c2|d1|f1|`
      );
    });
  });

  it('exposes privacy and terms before the user starts', () => {
    renderLanding();

    expect(screen.getByRole('link', { name: 'Privacitat' })).toHaveAttribute('href', '/legal/privacitat');
    expect(screen.getByRole('link', { name: 'Termes' })).toHaveAttribute('href', '/legal/termes');
    expect(screen.getByRole('link', { name: 'Contacte' })).toHaveAttribute('href', 'mailto:hola@arrel.eu');
  });

  it('links each capacity to its details section', () => {
    renderLanding();

    expect(screen.getByRole('link', { name: 'Veure Cos' })).toHaveAttribute('href', '/menu/arees#cos');
    expect(screen.getByRole('link', { name: 'Veure Propòsit' })).toHaveAttribute('href', '/menu/arees#proposit');
  });
});
