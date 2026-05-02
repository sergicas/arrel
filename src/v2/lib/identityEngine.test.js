import { describe, expect, it } from 'vitest';
import { synthesizeIdentity } from './identityEngine.js';
import { AREAS } from './types.js';

describe('Identity Engine', () => {
  it('returns null if there is not enough history', () => {
    const identity = synthesizeIdentity({ feedback: [], cycleReadings: [] });
    expect(identity).toBeNull();
  });

  it('detects a Practicant Decidit after one cycle', () => {
    const feedback = [];
    for (let i = 1; i <= 7; i++) {
      feedback.push({ cycle: 1, day: i, area: AREAS.PHYSICAL, value: 'done', note: '' });
    }
    const identity = synthesizeIdentity({ feedback, cycleNumber: 1 });
    expect(identity.archetype).toBe('Practicant Decidit');
    expect(identity.strongestArea).toBe('Cos');
  });

  it('detects an Observador Atent when notes are frequent and long', () => {
    const feedback = [];
    for (let i = 1; i <= 7; i++) {
      feedback.push({ 
        cycle: 1, 
        day: i, 
        area: AREAS.STRESS, 
        value: 'done', 
        note: 'Aquesta és una nota molt llarga per assegurar que el motor de to em detecti com a reflexiu i atent als detalls.' 
      });
    }
    const identity = synthesizeIdentity({ feedback, cycleNumber: 1 });
    expect(identity.archetype).toBe('Observador Atent');
    expect(identity.strongestArea).toBe('Calma');
  });

  it('detects a Constructor Resilient after high resilience and 2 cycles', () => {
    const feedback = [
      { cycle: 1, day: 1, value: 'skipped', note: '' },
      { cycle: 1, day: 2, value: 'done', note: '' }, // Torna de fricció
      { cycle: 1, day: 3, value: 'partial', note: '' },
      { cycle: 1, day: 4, value: 'done', note: '' }, // Torna de fricció
    ];
    // Afegim 10 dies més per arribar a 14
    for (let i = 5; i <= 14; i++) feedback.push({ cycle: 2, day: i, value: 'done', note: '' });

    const identity = synthesizeIdentity({ feedback, cycleNumber: 2 });
    expect(identity.archetype).toBe('Constructor Resilient');
    expect(identity.resilienceLevel).toBe('Alta');
  });

  it('calculates totals correctly', () => {
    const feedback = [
      { cycle: 1, day: 1, value: 'done', note: '' },
      { cycle: 1, day: 2, value: 'done', note: '' },
      { cycle: 1, day: 3, value: 'skipped', note: '' },
    ];
    const identity = synthesizeIdentity({ feedback, cycleNumber: 1 });
    // Ha de funcionar si té fites (aquí no en té prou per arquetip avançat però simulem)
    const result = synthesizeIdentity({ feedback: [...feedback, ...feedback, ...feedback], cycleNumber: 1 });
    expect(result.totalProves).toBe(6);
  });
});
