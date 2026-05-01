import { describe, expect, it } from 'vitest';
import { analyzeEvolution } from './evolutionEngine.js';
import { AREAS } from './types.js';

describe('Evolution Engine', () => {
  it('returns null for the first cycle', () => {
    const insights = analyzeEvolution({ cycleNumber: 1 });
    expect(insights).toBeNull();
  });

  it('detects sustained consistency over two cycles', () => {
    const feedback = [];
    // 5 dies "done" al cicle 1
    for (let i = 1; i <= 5; i++) feedback.push({ cycle: 1, day: i, value: 'done' });
    // 5 dies "done" al cicle 2
    for (let i = 1; i <= 5; i++) feedback.push({ cycle: 2, day: i, value: 'done' });

    const insights = analyzeEvolution({
      cycleNumber: 2,
      feedback,
      cycleReadings: [{ cycle: 1, reading: { title: 'Test' } }]
    });

    expect(insights).toContain('Has mantingut una constància excel·lent durant les últimes dues setmanes.');
  });

  it('detects sustained consistency over the last cycle', () => {
    const feedback = [];
    // 6 dies "done" al cicle 1
    for (let i = 1; i <= 6; i++) feedback.push({ cycle: 1, day: i, value: 'done' });

    const insights = analyzeEvolution({
      cycleNumber: 2,
      feedback,
      cycleReadings: [{ cycle: 1, reading: { title: 'Test' } }]
    });

    expect(insights).toContain('Has mantingut una constància excel·lent durant l’últim cicle.');
  });

  it('detects area repetition', () => {
    const insights = analyzeEvolution({
      cycleNumber: 2,
      currentCycleArea: AREAS.PHYSICAL,
      feedback: [{ cycle: 1, area: AREAS.PHYSICAL, value: 'done' }],
      cycleReadings: [{ cycle: 1, reading: { area: AREAS.PHYSICAL } }]
    });

    expect(insights).toContain('És el segon cicle que treballem la capacitat de Cos, consolidant el que has après.');
  });

  it('detects sentiment improvement between cycles', () => {
    const insights = analyzeEvolution({
      cycleNumber: 2,
      feedback: [
        { cycle: 1, day: 1, note: 'M’ha costat molt.', value: 'partial' },
        { cycle: 2, day: 1, note: 'Avui m’ha anat molt bé.', value: 'done' }
      ],
      cycleReadings: [{ cycle: 1, reading: { title: 'Test' } }]
    });

    expect(insights).toContain('Es nota una millora en com perceps les proves: d’un inici amb més esforç a una dinàmica més fluïda.');
  });
});
