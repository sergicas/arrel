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
          metadata: expect.objectContaining({
            mode: 'memory',
            nextSmallStep: expect.any(String),
          }),
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
    const payload = buildCycleReadingPayload({
      cycleNumber: 1,
      primaryArea: AREAS.STRESS,
      currentCycleArea: AREAS.STRESS,
      feedback: [
        { cycle: 1, day: 1, area: AREAS.STRESS, value: FEEDBACK.DONE },
        { cycle: 1, day: 2, area: AREAS.STRESS, value: FEEDBACK.DONE },
        { cycle: 1, day: 3, area: AREAS.STRESS, value: FEEDBACK.DONE },
        { cycle: 1, day: 4, area: AREAS.STRESS, value: FEEDBACK.PARTIAL },
        { cycle: 1, day: 5, area: AREAS.STRESS, value: FEEDBACK.PARTIAL },
        { cycle: 1, day: 6, area: AREAS.STRESS, value: FEEDBACK.SKIPPED },
      ],
    });
    const reading = generateMockCycleReading(payload);

    expect(reading).toMatchObject({
      title: 'Un cicle que va començar amb més entrada',
      confidence: 'alta',
      safetyNote: expect.any(String),
    });
    expect(reading.pattern).toContain('inici va entrar amb més disponibilitat');
    expect(reading.pattern).toContain('3 dies com a “Fet”, 2 amb “Fet amb esforç” i 1 com a “Ho deixo per avui”');
    expect(reading.availableCapacity).toContain('aturada breu');
    expect(reading.availableCapacity).toContain('dia 1');
    expect(reading.carePoint).toContain('dia 6');
    expect(reading.carePoint).toContain('Ho deixo per avui');
    expect(reading.nextCycleSuggestion).toContain('compta tres respiracions');
    expect(reading.nextActionStyle).toContain('versió mínima');
  });

  it('treats effort differently from leaving a day for today', () => {
    const payload = buildCycleReadingPayload({
      cycleNumber: 1,
      primaryArea: AREAS.PHYSICAL,
      currentCycleArea: AREAS.PHYSICAL,
      feedback: [
        { cycle: 1, day: 1, area: AREAS.PHYSICAL, value: FEEDBACK.DONE },
        { cycle: 1, day: 2, area: AREAS.PHYSICAL, value: FEEDBACK.PARTIAL, note: 'Avui pesava.' },
        { cycle: 1, day: 3, area: AREAS.PHYSICAL, value: FEEDBACK.DONE },
        { cycle: 1, day: 4, area: AREAS.PHYSICAL, value: FEEDBACK.DONE },
      ],
    });

    const reading = generateMockCycleReading(payload);

    expect(reading.carePoint).toContain('Fet amb esforç');
    expect(reading.carePoint).not.toContain('Ho deixo per avui');
    expect(reading.carePoint).toContain('Avui pesava.');
    expect(reading.nextActionStyle).toContain('menys durada o menys intensitat');
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
