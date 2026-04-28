import { describe, expect, it } from 'vitest';
import {
  formatWaitDuration,
  getMinutesUntilAvailable,
  getNextStepAvailableAt,
  isAcceleratedPace,
  isStepAvailable,
  normalizePace,
} from './pace.js';
import { PACE } from './types.js';

describe('pace helpers', () => {
  const start = new Date('2026-04-27T09:00:00+02:00');

  it('keeps slow pace locked until the next local midnight', () => {
    const expected = new Date(start);
    expected.setHours(24, 0, 0, 0);

    expect(getNextStepAvailableAt(PACE.SLOW, start)).toBe(expected.toISOString());
  });

  it('opens regular pace after six hours', () => {
    expect(getNextStepAvailableAt(PACE.REGULAR, start)).toBe(
      new Date(start.getTime() + 6 * 60 * 60 * 1000).toISOString()
    );
  });

  it('opens accelerated pace immediately', () => {
    expect(getNextStepAvailableAt(PACE.ACCELERATED, start)).toBe('immediate');
  });

  it('normalizes unknown pace values to slow', () => {
    expect(normalizePace('wild')).toBe(PACE.SLOW);
  });

  it('marks accelerated pace and immediate availability explicitly', () => {
    expect(isAcceleratedPace(PACE.ACCELERATED)).toBe(true);
    expect(isStepAvailable('immediate', start)).toBe(true);
    expect(getMinutesUntilAvailable('immediate', start)).toBe(0);
  });

  it('formats and evaluates wait times', () => {
    const availableAt = '2026-04-27T10:30:00.000Z';

    expect(isStepAvailable(availableAt, new Date('2026-04-27T10:29:00.000Z'))).toBe(false);
    expect(isStepAvailable(availableAt, new Date('2026-04-27T10:30:00.000Z'))).toBe(true);
    expect(getMinutesUntilAvailable(availableAt, new Date('2026-04-27T09:00:00.000Z'))).toBe(90);
    expect(formatWaitDuration(90)).toBe('1 h 30 min');
  });
});
