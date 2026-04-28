import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Reminder from './Reminder.jsx';

const mockUseArrel = vi.hoisted(() => vi.fn());

vi.mock('../../state/useArrel.js', () => ({
  useArrel: () => mockUseArrel(),
}));

function renderReminder(overrides = {}) {
  const setDailyReminder = vi.fn().mockResolvedValue({
    enabled: true,
    time: '08:30',
    permission: 'granted',
    scheduled: true,
  });

  mockUseArrel.mockReturnValue({
    state: {
      reminder: {
        enabled: false,
        time: '09:00',
        permission: 'unknown',
        scheduled: false,
        error: null,
      },
      ...overrides.state,
    },
    setDailyReminder,
    ...overrides,
  });

  render(
    <MemoryRouter>
      <Reminder />
    </MemoryRouter>
  );

  return { setDailyReminder };
}

describe('Reminder settings', () => {
  it('saves an enabled daily reminder with the selected time', async () => {
    const { setDailyReminder } = renderReminder();

    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.change(screen.getByLabelText(/Hora del recordatori/i), {
      target: { value: '08:30' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Desar recordatori' }));

    await waitFor(() => {
      expect(setDailyReminder).toHaveBeenCalledWith({ enabled: true, time: '08:30' });
    });
    expect(await screen.findByText('Recordatori actiu a les 08:30.')).toBeInTheDocument();
  });

  it('explains the web fallback when native notifications are unavailable', async () => {
    renderReminder({
      setDailyReminder: vi.fn().mockResolvedValue({
        enabled: true,
        time: '09:00',
        permission: 'unavailable',
        scheduled: false,
      }),
    });

    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: 'Desar recordatori' }));

    expect(
      await screen.findByText(/Preferència desada. Les notificacions locals s’activaran/i)
    ).toBeInTheDocument();
  });
});
