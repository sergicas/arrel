import { STATUS } from './types.js';

const KEY = 'arrel-v2-state';

export const initialState = {
  status: STATUS.NEW,
  primaryArea: null,
  secondaryArea: null,
  cycleNumber: 1,
  dayInCycle: 1,
  diagnosisAnswers: [],
  diagnosisScores: null,
  feedback: [],
  subscribed: false,
  feedbackJustGiven: false,
  cycleJustEnded: false,
};

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...initialState };
    const parsed = JSON.parse(raw);
    return { ...initialState, ...parsed, feedbackJustGiven: false, cycleJustEnded: false };
  } catch {
    return { ...initialState };
  }
}

export function saveState(state) {
  try {
    const { feedbackJustGiven: _feedbackJustGiven, cycleJustEnded: _cycleJustEnded, ...persistent } = state;
    localStorage.setItem(KEY, JSON.stringify(persistent));
  } catch (e) {
    console.warn('arrel: no s\'ha pogut desar l\'estat', e);
  }
}

export function clearState() {
  try {
    localStorage.removeItem(KEY);
  } catch (e) {
    console.warn('arrel: no s\'ha pogut esborrar l\'estat', e);
  }
}
