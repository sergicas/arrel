export const REMINDER_NOTIFICATION_ID = 2701;

const REMINDER_TITLE = 'Arrel';
const REMINDER_BODY = 'Tens una prova petita esperant-te.';

export function parseReminderTime(time) {
  const match = /^(\d{2}):(\d{2})$/.exec(time || '');
  if (!match) return null;

  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;

  return { hour, minute };
}

async function resolveBridge(bridge) {
  if (bridge) return bridge;

  try {
    const [{ Capacitor }, { LocalNotifications }] = await Promise.all([
      import('@capacitor/core'),
      import('@capacitor/local-notifications'),
    ]);
    return { Capacitor, LocalNotifications };
  } catch {
    return null;
  }
}

function getPlatform(Capacitor) {
  if (Capacitor?.getPlatform) return Capacitor.getPlatform();
  if (Capacitor?.isNativePlatform?.()) return 'native';
  return 'web';
}

function isNativePlatform(Capacitor) {
  if (Capacitor?.isNativePlatform) return Capacitor.isNativePlatform();
  return getPlatform(Capacitor) !== 'web';
}

async function ensureNotificationPermission(LocalNotifications) {
  const current = await LocalNotifications.checkPermissions();
  if (current.display === 'granted') return 'granted';

  const requested = await LocalNotifications.requestPermissions();
  return requested.display || 'unknown';
}

export async function cancelDailyReminder(bridge) {
  const resolved = await resolveBridge(bridge);
  const { Capacitor, LocalNotifications } = resolved || {};

  if (!LocalNotifications || !isNativePlatform(Capacitor)) {
    return { cancelled: false, platform: getPlatform(Capacitor) };
  }

  await LocalNotifications.cancel({
    notifications: [{ id: REMINDER_NOTIFICATION_ID }],
  });

  return { cancelled: true, platform: getPlatform(Capacitor) };
}

export async function scheduleDailyReminder(time, bridge) {
  const parsed = parseReminderTime(time);
  if (!parsed) {
    throw new Error('Hora de recordatori no vàlida');
  }

  const resolved = await resolveBridge(bridge);
  const { Capacitor, LocalNotifications } = resolved || {};
  const platform = getPlatform(Capacitor);

  if (!LocalNotifications || !isNativePlatform(Capacitor)) {
    return {
      enabled: true,
      time,
      permission: 'unavailable',
      platform,
      scheduled: false,
      lastScheduledAt: null,
      error: null,
    };
  }

  const permission = await ensureNotificationPermission(LocalNotifications);
  if (permission !== 'granted') {
    return {
      enabled: false,
      time,
      permission,
      platform,
      scheduled: false,
      lastScheduledAt: null,
      error: 'Permís de notificacions denegat',
    };
  }

  await cancelDailyReminder(resolved);
  await LocalNotifications.schedule({
    notifications: [
      {
        id: REMINDER_NOTIFICATION_ID,
        title: REMINDER_TITLE,
        body: REMINDER_BODY,
        schedule: {
          on: parsed,
          repeats: true,
        },
      },
    ],
  });

  return {
    enabled: true,
    time,
    permission,
    platform,
    scheduled: true,
    lastScheduledAt: Date.now(),
    error: null,
  };
}
