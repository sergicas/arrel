import { DEFAULT_REMINDER, PACE, STATUS } from './types.js';
import { normalizePace } from './pace.js';

const KEY = 'arrel-v2-state';

export function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const initialState = {
  status: STATUS.NEW,
  entryMode: null,
  primaryArea: null,
  secondaryArea: null,
  cycleNumber: 1,
  dayInCycle: 1,
  diagnosisAnswers: [],
  diagnosisScores: null,
  feedback: [],
  pace: PACE.SLOW,
  continuedAfterInitialPeriod: false,
  reminder: DEFAULT_REMINDER,
  feedbackJustGiven: false,
  diagnosisJustCompleted: false,
  cycleJustEnded: false,
  currentDayAvailableOn: null,
  nextDayAvailableAt: null,
  updatedAt: null,
};

function getCapacitorRuntime() {
  if (typeof window === 'undefined') return null;
  return window.Capacitor || null;
}

export function shouldUseNativePreferences() {
  const Capacitor = getCapacitorRuntime();
  if (!Capacitor) return false;
  if (Capacitor.isNativePlatform) return Capacitor.isNativePlatform();
  if (Capacitor.getPlatform) return Capacitor.getPlatform() !== 'web';
  return false;
}

function normalizeState(parsed = {}) {
  const { subscribed, ...storedState } = parsed || {};
  const merged = {
    ...initialState,
    ...storedState,
    continuedAfterInitialPeriod: storedState.continuedAfterInitialPeriod ?? Boolean(subscribed),
    pace: normalizePace(storedState.pace),
    reminder: {
      ...DEFAULT_REMINDER,
      ...(storedState.reminder || {}),
    },
    feedbackJustGiven: false,
    diagnosisJustCompleted: false,
    cycleJustEnded: false,
  };
  if (merged.status !== STATUS.NEW && !merged.currentDayAvailableOn) {
    merged.currentDayAvailableOn = getLocalDateKey();
  }
  return merged;
}

function persistentState(state, updatedAt = Date.now()) {
  const {
    feedbackJustGiven: _feedbackJustGiven,
    diagnosisJustCompleted: _diagnosisJustCompleted,
    cycleJustEnded: _cycleJustEnded,
    subscribed: _subscribed,
    ...persistent
  } = state;
  return {
    ...persistent,
    updatedAt,
  };
}

function getUpdatedAt(state) {
  return Number.isFinite(Number(state?.updatedAt)) ? Number(state.updatedAt) : 0;
}

async function resolvePreferences() {
  const { Preferences } = await import('@capacitor/preferences');
  return Preferences;
}

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...initialState };
    return normalizeState(JSON.parse(raw));
  } catch {
    return { ...initialState };
  }
}

export function saveState(state) {
  try {
    const storedState = persistentState(state);
    localStorage.setItem(KEY, JSON.stringify(storedState));
    return storedState;
  } catch (e) {
    console.warn('arrel: no s\'ha pogut desar l\'estat', e);
    return persistentState(state);
  }
}

export function clearState() {
  try {
    localStorage.removeItem(KEY);
  } catch (e) {
    console.warn('arrel: no s\'ha pogut esborrar l\'estat', e);
  }
}

export async function loadDurableState() {
  if (!shouldUseNativePreferences()) return loadState();

  try {
    const Preferences = await resolvePreferences();
    const { value } = await Preferences.get({ key: KEY });
    if (!value) return loadState();

    const localState = loadState();
    const preferencesState = normalizeState(JSON.parse(value));
    const state = getUpdatedAt(localState) > getUpdatedAt(preferencesState)
      ? localState
      : preferencesState;

    const storedState = saveState(state);
    if (state === localState) {
      await Preferences.set({ key: KEY, value: JSON.stringify(storedState) });
    }
    return state;
  } catch (e) {
    console.warn('arrel: no s\'ha pogut carregar l\'estat durable', e);
    return loadState();
  }
}

export async function saveDurableState(state) {
  const storedState = saveState(state);
  if (!shouldUseNativePreferences()) return;

  try {
    const Preferences = await resolvePreferences();
    await Preferences.set({
      key: KEY,
      value: JSON.stringify(storedState),
    });
  } catch (e) {
    console.warn('arrel: no s\'ha pogut desar l\'estat durable', e);
  }
}

export async function clearDurableState() {
  clearState();
  if (!shouldUseNativePreferences()) return;

  try {
    const Preferences = await resolvePreferences();
    await Preferences.remove({ key: KEY });
  } catch (e) {
    console.warn('arrel: no s\'ha pogut esborrar l\'estat durable', e);
  }
}
