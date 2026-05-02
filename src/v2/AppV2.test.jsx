import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import AppV2 from './AppV2.jsx';
import { AREAS, STATUS } from './lib/types.js';

const STORAGE_KEY = 'arrel-v2-state';

describe('AppV2 routing', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('arrel-v2-clean-boot', 'true');
    window.history.pushState({}, '', '/');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('redirects /app to /inici when the user has not started', async () => {
    window.history.pushState({}, '', '/app');

    render(
      <HelmetProvider>
        <AppV2 />
      </HelmetProvider>
    );

    // Esperem que l'app s'hagi carregat i hagi redirigit a /inici mostrant el títol principal
    await waitFor(() => {
      expect(window.location.pathname).toBe('/inici');
      expect(screen.getByRole('heading', { name: 'Autonomia, capacitat i il·lusió cada dia.' })).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('opens a new diagnostic cycle without mixing existing feedback', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      status: STATUS.ACTIVE,
      entryMode: 'starter',
      primaryArea: AREAS.STRESS,
      cycleNumber: 1,
      dayInCycle: 2,
      currentDayAvailableOn: '2026-04-27',
      feedback: [{ cycle: 1, day: 1, area: AREAS.STRESS, value: 'done' }],
      updatedAt: Date.now(),
    }));
    window.history.pushState({}, '', '/diagnostic');

    render(
      <HelmetProvider>
        <AppV2 />
      </HelmetProvider>
    );

    for (let step = 0; step < 5; step += 1) {
      await waitFor(() => {
        expect(document.querySelector('.v2-option')).toBeInTheDocument();
      });
      fireEvent.click(document.querySelector('.v2-option'));
    }

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      expect(stored).toMatchObject({
        status: STATUS.ACTIVE,
        entryMode: 'diagnostic',
        cycleNumber: 2,
        dayInCycle: 1,
        feedback: [{ cycle: 1, day: 1, area: AREAS.STRESS, value: 'done' }],
      });
    });
    expect(window.confirm).toHaveBeenCalledWith(expect.stringContaining('obrirà un cicle nou'));
  });
});
