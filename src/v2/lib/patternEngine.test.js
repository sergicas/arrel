import { describe, expect, it } from 'vitest';
import { identifyPatterns } from './patternEngine.js';
import { FEEDBACK } from './types.js';

describe('Pattern Engine', () => {
  it('returns null if there are not enough entries', () => {
    const patterns = identifyPatterns([]);
    expect(patterns).toBeNull();
  });

  it('detects the best day of the week', () => {
    const monday = new Date('2026-05-04T10:00:00Z').getTime(); // Dilluns
    const tuesday = new Date('2026-05-05T10:00:00Z').getTime(); // Dimarts
    
    const feedback = [
      { at: monday, value: FEEDBACK.DONE },
      { at: monday + 7 * 24 * 60 * 60 * 1000, value: FEEDBACK.DONE }, // Següent dilluns
      { at: tuesday, value: FEEDBACK.SKIPPED },
      { at: tuesday + 7 * 24 * 60 * 60 * 1000, value: FEEDBACK.SKIPPED },
      { at: monday + 14 * 24 * 60 * 60 * 1000, value: FEEDBACK.DONE },
    ];

    const patterns = identifyPatterns(feedback);
    expect(patterns).toContainEqual(expect.objectContaining({ id: 'best_day' }));
    expect(patterns.find(p => p.id === 'best_day').text).toContain('dilluns');
  });

  it('detects the best time slot', () => {
    const morning = new Date('2026-05-04T09:00:00Z').getTime();
    const evening = new Date('2026-05-04T22:00:00Z').getTime();

    const feedback = [
      { at: morning, value: FEEDBACK.DONE },
      { at: morning + 24 * 60 * 60 * 1000, value: FEEDBACK.DONE },
      { at: morning + 48 * 60 * 60 * 1000, value: FEEDBACK.DONE },
      { at: evening, value: FEEDBACK.SKIPPED },
      { at: evening + 24 * 60 * 60 * 1000, value: FEEDBACK.SKIPPED },
    ];

    const patterns = identifyPatterns(feedback);
    expect(patterns).toContainEqual(expect.objectContaining({ id: 'best_slot' }));
    expect(patterns.find(p => p.id === 'best_slot').text).toContain('el matí');
  });

  it('detects context keywords', () => {
    const now = Date.now();
    const feedback = [
      { at: now, value: FEEDBACK.DONE, note: 'Estava molt tranquil.' },
      { at: now + 1, value: FEEDBACK.DONE, note: 'Molt tranquil a casa.' },
      { at: now + 2, value: FEEDBACK.DONE, note: 'Fet.' },
      { at: now + 3, value: FEEDBACK.DONE, note: 'Ok.' },
      { at: now + 4, value: FEEDBACK.DONE, note: 'Bé.' },
    ];

    const patterns = identifyPatterns(feedback);
    expect(patterns).toContainEqual(expect.objectContaining({ id: 'context' }));
    expect(patterns.find(p => p.id === 'context').text).toContain('tranquil');
  });
});
