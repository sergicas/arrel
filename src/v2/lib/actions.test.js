import { describe, expect, it } from 'vitest';
import {
  ACTIONS,
  getAction,
  getAllActions,
  isActionDurationInRange,
} from './actions.js';
import { AREAS } from './types.js';

describe('v2 actions', () => {
  it('keeps every visible action inside the promised 3-10 minute range', () => {
    for (const action of getAllActions()) {
      expect(action.duration, action.text).toMatch(/min/);
      expect(isActionDurationInRange(action), action.text).toBe(true);
      expect(action.text, action.text).not.toMatch(/\bhores?\b/i);
    }
  });

  it('has six actions for every area', () => {
    for (const area of Object.values(AREAS)) {
      expect(ACTIONS[area]).toHaveLength(6);
    }
  });

  it('adds local metadata for cycle readings to every action', () => {
    for (const action of getAllActions()) {
      expect(action.metadata, action.text).toMatchObject({
        mode: expect.stringMatching(/^(body|memory|calm|social|purpose)$/),
        setting: expect.stringMatching(/^(inside|outside|either)$/),
        social: expect.stringMatching(/^(solo|with_person|message|call)$/),
        intensity: expect.stringMatching(/^(low|medium)$/),
        autonomySignal: expect.any(String),
        capacitySignal: expect.any(String),
        motivationSignal: expect.any(String),
        nextSmallStep: expect.any(String),
      });
    }
  });

  it('returns every action with a short guided structure', () => {
    const action = getAction(AREAS.STRESS, 1);

    expect(action.steps).toHaveLength(3);
    expect(action.steps[0]).toMatch(/Prepara/);
    expect(action.steps[1]).toBe(action.text);
    expect(action.steps[2]).toMatch(/Tanca/);
  });
});
