import { describe, expect, it } from 'vitest';
import { analyzeUserStyle, USER_STYLES } from './toneEngine.js';

describe('Tone Engine', () => {
  it('returns BALANCED for new users', () => {
    expect(analyzeUserStyle([])).toBe(USER_STYLES.BALANCED);
  });

  it('detects CONCISE style when there are no notes', () => {
    const feedback = [
      { day: 1, value: 'done', note: '' },
      { day: 2, value: 'done', note: '' },
      { day: 3, value: 'done', note: '' },
    ];
    expect(analyzeUserStyle(feedback)).toBe(USER_STYLES.CONCISE);
  });

  it('detects REFLECTIVE style when notes are long', () => {
    const feedback = [
      { day: 1, value: 'done', note: 'Avui m’ha anat molt bé, he sentit que podia fer-ho tot.' },
      { day: 2, value: 'done', note: 'He estat pensant en com de bé em sento quan faig aquestes proves.' },
      { day: 3, value: 'done', note: 'M’ha costat una mica però al final he trobat el moment ideal.' },
    ];
    expect(analyzeUserStyle(feedback)).toBe(USER_STYLES.REFLECTIVE);
  });

  it('detects CONCISE style when notes are very short', () => {
    const feedback = [
      { day: 1, value: 'done', note: 'Bé.' },
      { day: 2, value: 'done', note: 'Ok.' },
      { day: 3, value: 'done', note: 'Fet.' },
    ];
    expect(analyzeUserStyle(feedback)).toBe(USER_STYLES.CONCISE);
  });

  it('detects BALANCED style for normal notes', () => {
    const feedback = [
      { day: 1, value: 'done', note: 'M’ha anat bé.' },
      { day: 2, value: 'done', note: 'Ha costat una mica.' },
      { day: 3, value: 'done', note: 'Fet sense problemes.' },
    ];
    expect(analyzeUserStyle(feedback)).toBe(USER_STYLES.BALANCED);
  });
});
