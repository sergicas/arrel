import { PACE, PACE_OPTIONS } from './types.js';

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
const IMMEDIATE_AVAILABLE = 'immediate';

export function normalizePace(pace) {
  return Object.values(PACE).includes(pace) ? pace : PACE.SLOW;
}

export function getPaceOption(pace) {
  return PACE_OPTIONS[normalizePace(pace)];
}

export function isAcceleratedPace(pace) {
  return normalizePace(pace) === PACE.ACCELERATED;
}

export function getNextStepAvailableAt(pace, from = new Date()) {
  const normalized = normalizePace(pace);

  if (normalized === PACE.ACCELERATED) {
    return IMMEDIATE_AVAILABLE;
  }

  if (normalized === PACE.REGULAR) {
    return new Date(from.getTime() + SIX_HOURS_MS).toISOString();
  }

  const tomorrow = new Date(from);
  tomorrow.setHours(24, 0, 0, 0);
  return tomorrow.toISOString();
}

export function isStepAvailable(availableAt, date = new Date()) {
  if (availableAt === IMMEDIATE_AVAILABLE) return true;
  if (!availableAt) return false;
  const timestamp = Date.parse(availableAt);
  if (Number.isNaN(timestamp)) return false;
  return date.getTime() >= timestamp;
}

export function getMinutesUntilAvailable(availableAt, date = new Date()) {
  if (availableAt === IMMEDIATE_AVAILABLE) return 0;
  const timestamp = Date.parse(availableAt);
  if (Number.isNaN(timestamp)) return 0;
  return Math.max(0, Math.ceil((timestamp - date.getTime()) / 60000));
}

export function formatWaitDuration(minutes) {
  if (minutes <= 1) return 'menys d’1 min';
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest} min`;
  if (rest === 0) return `${hours} h`;
  return `${hours} h ${String(rest).padStart(2, '0')} min`;
}
