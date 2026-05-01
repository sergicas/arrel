import { describe, expect, it } from 'vitest';
import { assessBurnoutRisk } from './riskEngine.js';
import { FEEDBACK } from './types.js';

describe('Risk Engine', () => {
  it('returns low risk for new cycles', () => {
    const risk = assessBurnoutRisk({ cycleNumber: 1, feedback: [] });
    expect(risk.risk).toBe('low');
  });

  it('detects high risk after 3 consecutive days of friction', () => {
    const feedback = [
      { cycle: 1, day: 1, value: FEEDBACK.PARTIAL, note: '' },
      { cycle: 1, day: 2, value: FEEDBACK.SKIPPED, note: '' },
      { cycle: 1, day: 3, value: FEEDBACK.PARTIAL, note: '' },
    ];
    const risk = assessBurnoutRisk({ cycleNumber: 1, feedback });
    expect(risk.risk).toBe('high');
    expect(risk.type).toBe('friction');
    expect(risk.message).toContain('ritme d’aquests últims tres dies');
  });

  it('detects medium risk after multiple fatigue notes', () => {
    const feedback = [
      { cycle: 1, day: 1, value: FEEDBACK.DONE, note: 'M’ha costat molt.' },
      { cycle: 1, day: 2, value: FEEDBACK.DONE, note: 'Bé.' },
      { cycle: 1, day: 3, value: FEEDBACK.DONE, note: 'Cansat.' },
      { cycle: 1, day: 4, value: FEEDBACK.DONE, note: 'Ok.' },
    ];
    const risk = assessBurnoutRisk({ cycleNumber: 1, feedback });
    expect(risk.risk).toBe('medium');
    expect(risk.type).toBe('sentiment');
    expect(risk.message).toContain('proves t’estan costant');
  });

  it('ignores friction from past cycles', () => {
    const feedback = [
      { cycle: 1, day: 6, value: FEEDBACK.SKIPPED, note: '' },
      { cycle: 2, day: 1, value: FEEDBACK.DONE, note: '' },
    ];
    const risk = assessBurnoutRisk({ cycleNumber: 2, feedback });
    expect(risk.risk).toBe('low');
  });
});
