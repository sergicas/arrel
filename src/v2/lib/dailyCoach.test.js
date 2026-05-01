import { describe, expect, it } from 'vitest';
import { getDailyCoachDecision } from './dailyCoach.js';
import { AREAS, FEEDBACK } from './types.js';

describe('Daily Coach', () => {
  it('gives a welcome message on the first day', () => {
    const decision = getDailyCoachDecision({
      dayInCycle: 1,
      feedback: [],
    });
    expect(decision.difficulty).toBe('standard');
    expect(decision.insight).toContain('començar amb energia');
  });

  it('suggests easy difficulty if yesterday was skipped', () => {
    const decision = getDailyCoachDecision({
      cycleNumber: 1,
      dayInCycle: 2,
      feedback: [
        { cycle: 1, day: 1, area: AREAS.PHYSICAL, value: FEEDBACK.SKIPPED, note: '' },
      ],
    });
    expect(decision.difficulty).toBe('easy');
    expect(decision.insight).toContain('prioritzem la constància');
  });

  it('suggests easy difficulty if yesterday note shows fatigue', () => {
    const decision = getDailyCoachDecision({
      cycleNumber: 1,
      dayInCycle: 2,
      feedback: [
        { cycle: 1, day: 1, area: AREAS.PHYSICAL, value: FEEDBACK.DONE, note: 'M’he sentit molt cansat.' },
      ],
    });
    expect(decision.difficulty).toBe('easy');
    expect(decision.insight).toContain('demanava força');
  });

  it('suggests standard difficulty and positive insight if yesterday note shows momentum', () => {
    const decision = getDailyCoachDecision({
      cycleNumber: 1,
      dayInCycle: 2,
      feedback: [
        { cycle: 1, day: 1, area: AREAS.PHYSICAL, value: FEEDBACK.DONE, note: 'M’ha anat molt bé i ha estat fàcil.' },
      ],
    });
    expect(decision.difficulty).toBe('standard');
    expect(decision.insight).toContain('mantenim el ritme');
  });

  it('suggests easy difficulty if yesterday had friction (PARTIAL)', () => {
    const decision = getDailyCoachDecision({
      cycleNumber: 1,
      dayInCycle: 2,
      feedback: [
        { cycle: 1, day: 1, area: AREAS.PHYSICAL, value: FEEDBACK.PARTIAL, note: '' },
      ],
    });
    expect(decision.difficulty).toBe('easy');
    expect(decision.insight).toContain('pas més petit');
  });
});
