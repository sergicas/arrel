import { describe, expect, it } from 'vitest';
import { buildCycleReadingPayload, generateMockCycleReading } from './cycleReading.js';
import { AREAS, FEEDBACK } from './types.js';

describe('cycle readings', () => {
  it('builds a simple payload for the current cycle', () => {
    const payload = buildCycleReadingPayload({
      cycleNumber: 2,
      primaryArea: AREAS.STRESS,
      currentCycleArea: AREAS.COGNITIVE,
      feedback: [
        {
          cycle: 2,
          day: 2,
          area: AREAS.COGNITIVE,
          text: 'Recorda una cosa concreta.',
          duration: '≈ 5 min',
          value: FEEDBACK.PARTIAL,
          note: 'Ha costat una mica.',
          completedOn: '2026-04-28',
        },
        {
          cycle: 1,
          day: 1,
          area: AREAS.STRESS,
          value: FEEDBACK.DONE,
        },
        {
          cycle: 2,
          day: 1,
          area: AREAS.COGNITIVE,
          value: FEEDBACK.DONE,
          completedOn: '2026-04-27',
        },
      ],
    });

    expect(payload).toMatchObject({
      cycleNumber: 2,
      primaryArea: AREAS.STRESS,
      currentCycleArea: AREAS.COGNITIVE,
      days: [
        {
          day: 1,
          area: AREAS.COGNITIVE,
          result: FEEDBACK.DONE,
          note: '',
          completedOn: '2026-04-27',
        },
        {
          day: 2,
          area: AREAS.COGNITIVE,
          action: 'Recorda una cosa concreta.',
          duration: '≈ 5 min',
          result: FEEDBACK.PARTIAL,
          note: 'Ha costat una mica.',
          completedOn: '2026-04-28',
        },
      ],
    });
    expect(payload.days[0].action).toEqual(expect.any(String));
    expect(payload.days).toHaveLength(2);
  });

  it('uses the latest cycle with feedback when the current cycle has no readings yet', () => {
    const payload = buildCycleReadingPayload({
      cycleNumber: 2,
      primaryArea: AREAS.STRESS,
      currentCycleArea: AREAS.COGNITIVE,
      feedback: [
        {
          cycle: 1,
          day: 1,
          area: AREAS.STRESS,
          value: FEEDBACK.DONE,
          completedOn: '2026-04-27',
        },
      ],
    });

    expect(payload.cycleNumber).toBe(1);
    expect(payload.days).toHaveLength(1);
    expect(payload.days[0]).toMatchObject({
      day: 1,
      area: AREAS.STRESS,
      result: FEEDBACK.DONE,
    });
  });

  it('returns a deterministic cautious reading from local data', () => {
    const reading = generateMockCycleReading({
      cycleNumber: 1,
      primaryArea: AREAS.STRESS,
      currentCycleArea: AREAS.STRESS,
      days: [
        { day: 1, area: AREAS.STRESS, result: FEEDBACK.DONE },
        { day: 2, area: AREAS.STRESS, result: FEEDBACK.DONE },
        { day: 3, area: AREAS.STRESS, result: FEEDBACK.DONE },
        { day: 4, area: AREAS.PHYSICAL, result: FEEDBACK.PARTIAL },
        { day: 5, area: AREAS.PHYSICAL, result: FEEDBACK.SKIPPED },
        { day: 6, area: AREAS.PHYSICAL, result: FEEDBACK.PARTIAL },
      ],
    });

    expect(reading).toMatchObject({
      title: 'Lectura del cicle',
      confidence: 'alta',
      safetyNote: expect.any(String),
    });
    expect(reading.availableCapacity).toContain('Calma');
    expect(reading.carePoint).toContain('Cos');
    expect(reading.nextCycleSuggestion).toContain('Cos');
    expect(reading.pattern).toContain('Amb les dades d’aquest cicle');
  });

  it('keeps confidence low when there is not enough data', () => {
    const reading = generateMockCycleReading({
      cycleNumber: 1,
      primaryArea: AREAS.STRESS,
      currentCycleArea: AREAS.STRESS,
      days: [
        { day: 1, area: AREAS.STRESS, result: FEEDBACK.DONE },
        { day: 2, area: AREAS.STRESS, result: FEEDBACK.PARTIAL },
      ],
    });

    expect(reading.confidence).toBe('baixa');
    expect(reading.pattern).toContain('encara no hi ha prou base');
  });
});
