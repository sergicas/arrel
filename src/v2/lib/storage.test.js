import { beforeEach, describe, expect, it } from 'vitest';
import { loadDurableState, loadState, saveState, shouldUseNativePreferences } from './storage.js';

const STORAGE_KEY = 'arrel-v2-state';

describe('v2 storage', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('arrel-v2-clean-boot', 'true'); // Per defecte els tests assumeixen entorn ja netejat
    delete window.Capacitor;
  });

  it('clears v1 garbage on first run (clean boot)', async () => {
    localStorage.clear(); // Forcem entorn realment buit (sense el flag de clean boot)
    localStorage.setItem('supabase-key', 'old-token');
    localStorage.setItem('stripe-id', 'cus_123');

    // El clean boot ara s'executa dins de loadDurableState
    await loadDurableState();

    expect(localStorage.getItem('supabase-key')).toBeNull();
    expect(localStorage.getItem('stripe-id')).toBeNull();
    expect(localStorage.getItem('arrel-v2-clean-boot')).toBe('true');
  });

  it('migrates the old subscribed flag to continuedAfterInitialPeriod', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ subscribed: true }));

    expect(loadState().continuedAfterInitialPeriod).toBe(true);
  });

  it('fills missing reminder preferences with defaults', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ status: 'active' }));

    expect(loadState().reminder).toMatchObject({
      enabled: false,
      time: '09:00',
      permission: 'unknown',
      scheduled: false,
    });
  });

  it('fills missing or invalid pace with the slow default', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ status: 'active', pace: 'rush' }));

    expect(loadState().pace).toBe('slow');
  });

  it('fills missing cycle readings for older stored states', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ status: 'active', feedback: [] }));

    expect(loadState().cycleReadings).toEqual([]);
  });

  it('does not persist transient UI flags or the old subscribed flag', () => {
    saveState({
      status: 'active',
      subscribed: true,
      continuedAfterInitialPeriod: true,
      reminder: {
        enabled: true,
        time: '08:30',
        permission: 'granted',
        scheduled: true,
      },
      feedbackJustGiven: true,
      diagnosisJustCompleted: true,
      cycleJustEnded: true,
    });

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));

    expect(stored).toMatchObject({
      status: 'active',
      continuedAfterInitialPeriod: true,
      reminder: {
        enabled: true,
        time: '08:30',
      },
    });
    expect(stored).not.toHaveProperty('subscribed');
    expect(stored).not.toHaveProperty('feedbackJustGiven');
    expect(stored).not.toHaveProperty('diagnosisJustCompleted');
    expect(stored).not.toHaveProperty('cycleJustEnded');
    expect(stored.updatedAt).toEqual(expect.any(Number));
  });

  it('detects native Capacitor runtimes for durable preferences', () => {
    window.Capacitor = {
      isNativePlatform: () => true,
    };

    expect(shouldUseNativePreferences()).toBe(true);
  });

  it('keeps web storage as the default outside native Capacitor', () => {
    window.Capacitor = {
      getPlatform: () => 'web',
    };

    expect(shouldUseNativePreferences()).toBe(false);
  });
});
