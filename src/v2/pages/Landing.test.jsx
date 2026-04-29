import { describe, it, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Landing from './Landing.jsx';
import { ArrelProvider } from '../state/ArrelContext.jsx';
import { useArrel } from '../state/useArrel.js';
import { AREAS, STATUS } from '../lib/types.js';

function StateProbe() {
  const location = useLocation();
  const { state, todayAction } = useArrel();

  return (
    <output data-testid="state">
      {location.pathname}|{state.status}|{state.entryMode}|{state.primaryArea}|{todayAction?.duration || 'sense-durada'}
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

    expect(screen.getByRole('button', { name: /Triar la prova d’avui/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ajustar focus/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tornar enrere' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Triar la prova d’avui/ }));

    expect(screen.getByRole('button', { name: /Cos/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Memòria/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tornar a les opcions' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Memòria/ }));

    await waitFor(() => {
      expect(screen.getByTestId('state')).toHaveTextContent(`/app|${STATUS.ACTIVE}|starter|${AREAS.COGNITIVE}|`);
    });
    expect(screen.getByTestId('state')).toHaveTextContent('min');
  });

  it('exposes privacy and terms before the user starts', () => {
    renderLanding();

    expect(screen.getByRole('link', { name: 'Privacitat' })).toHaveAttribute('href', '/legal/privacitat');
    expect(screen.getByRole('link', { name: 'Termes' })).toHaveAttribute('href', '/legal/termes');
    expect(screen.getByRole('link', { name: 'Contacte' })).toHaveAttribute('href', 'mailto:hola@arrel.eu');
  });
});
