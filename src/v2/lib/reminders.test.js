import { describe, expect, it, vi } from 'vitest';
import {
  REMINDER_NOTIFICATION_ID,
  cancelDailyReminder,
  parseReminderTime,
  scheduleDailyReminder,
} from './reminders.js';

function createNativeBridge(permission = 'granted') {
  return {
    Capacitor: {
      getPlatform: () => 'ios',
      isNativePlatform: () => true,
    },
    LocalNotifications: {
      checkPermissions: vi.fn().mockResolvedValue({ display: permission }),
      requestPermissions: vi.fn().mockResolvedValue({ display: permission }),
      schedule: vi.fn().mockResolvedValue(undefined),
      cancel: vi.fn().mockResolvedValue(undefined),
    },
  };
}

describe('reminders', () => {
  it('parses valid reminder times and rejects invalid ones', () => {
    expect(parseReminderTime('08:30')).toEqual({ hour: 8, minute: 30 });
    expect(parseReminderTime('24:00')).toBeNull();
    expect(parseReminderTime('8:30')).toBeNull();
  });

  it('schedules a native repeating reminder after permission is granted', async () => {
    const bridge = createNativeBridge();

    const result = await scheduleDailyReminder('08:30', bridge);

    expect(result).toMatchObject({
      enabled: true,
      permission: 'granted',
      platform: 'ios',
      scheduled: true,
    });
    expect(bridge.LocalNotifications.cancel).toHaveBeenCalledWith({
      notifications: [{ id: REMINDER_NOTIFICATION_ID }],
    });
    expect(bridge.LocalNotifications.schedule).toHaveBeenCalledWith({
      notifications: [
        expect.objectContaining({
          id: REMINDER_NOTIFICATION_ID,
          schedule: {
            on: { hour: 8, minute: 30 },
            repeats: true,
          },
        }),
      ],
    });
  });

  it('keeps the preference on web without pretending that a native reminder was scheduled', async () => {
    const result = await scheduleDailyReminder('09:15', {
      Capacitor: {
        getPlatform: () => 'web',
        isNativePlatform: () => false,
      },
      LocalNotifications: null,
    });

    expect(result).toMatchObject({
      enabled: true,
      permission: 'unavailable',
      platform: 'web',
      scheduled: false,
    });
  });

  it('cancels a native reminder', async () => {
    const bridge = createNativeBridge();

    await cancelDailyReminder(bridge);

    expect(bridge.LocalNotifications.cancel).toHaveBeenCalledWith({
      notifications: [{ id: REMINDER_NOTIFICATION_ID }],
    });
  });
});
